import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";
import { parse as parseYaml } from "yaml";

// content/blog 안의 마크다운 파일 1개 = 블로그 글 1개. 빌드 시점에 한 번만 읽는다.
const BLOG_DIR = join(process.cwd(), "content", "blog");

export type BlogFaq = { q: string; a: string };
export type BlogHeading = { id: string; text: string; depth: 2 | 3 };

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  mainKeyword: string;
  thumbnail?: string;
  aiAnswer: string;
  faq: BlogFaq[];
  hub?: string;
  /** true 면 임시저장. 목록·상세·sitemap·RSS 어디에도 나오지 않는다. */
  draft: boolean;
  html: string;
  headings: BlogHeading[];
};

/** 목록 카드에만 필요한 필드. 본문 HTML을 클라이언트로 내려보내지 않기 위해 분리한다. */
export type BlogCard = Pick<BlogPost, "slug" | "title" | "description" | "category" | "date" | "thumbnail">;

function fail(file: string, message: string): never {
  throw new Error(`[content/blog/${file}] ${message}`);
}

/** `--- ... ---` 프런트매터와 본문을 분리한다. */
function splitFrontmatter(file: string, raw: string): { data: unknown; body: string } {
  const text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) fail(file, "맨 위에 --- 로 감싼 프런트매터가 필요합니다.");
  try {
    return { data: parseYaml(match[1]), body: text.slice(match[0].length).trim() };
  } catch (error) {
    fail(file, `프런트매터 YAML을 읽을 수 없습니다: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function text(file: string, data: Record<string, unknown>, key: string, required: true): string;
function text(file: string, data: Record<string, unknown>, key: string, required: false): string | undefined;
function text(file: string, data: Record<string, unknown>, key: string, required: boolean) {
  const value = data[key];
  if (value === undefined || value === null || value === "") {
    if (required) fail(file, `필수 항목 "${key}" 가 없습니다.`);
    return undefined;
  }
  if (typeof value !== "string") fail(file, `"${key}" 는 문자열이어야 합니다.`);
  return value.trim();
}

/** YAML은 2026-10-06 을 Date 로 읽으므로 항상 YYYY-MM-DD 문자열로 맞춘다. */
function date(file: string, data: Record<string, unknown>, key: string, fallback?: string): string {
  const value = data[key];
  if (value === undefined || value === null || value === "") {
    if (fallback) return fallback;
    fail(file, `필수 항목 "${key}" 가 없습니다.`);
  }
  const iso = value instanceof Date ? value.toISOString().slice(0, 10) : String(value).trim().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) fail(file, `"${key}" 는 YYYY-MM-DD 형식이어야 합니다. (받은 값: ${String(value)})`);
  return iso;
}

/**
 * 임시저장 여부. `draft: true` 면 비공개.
 * 줄이 없거나 `draft: false` 면 공개한다. 오타로 조용히 공개되는 일이 없도록
 * true/false 로 읽을 수 없는 값은 빌드를 세운다.
 */
function isDraft(file: string, data: Record<string, unknown>): boolean {
  const value = data.draft;
  if (value === undefined || value === null || value === "") return false;
  if (typeof value === "boolean") return value;
  const text = String(value).trim().toLowerCase();
  if (text === "true") return true;
  if (text === "false") return false;
  fail(file, `"draft" 는 true 또는 false 여야 합니다. (받은 값: ${String(value)})`);
}

function faqList(file: string, data: Record<string, unknown>): BlogFaq[] {
  const value = data.faq;
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) fail(file, '"faq" 는 - q: / a: 형태의 목록이어야 합니다.');
  return value.map((entry, index) => {
    if (!entry || typeof entry !== "object") fail(file, `faq ${index + 1}번 항목이 q/a 쌍이 아닙니다.`);
    const row = entry as Record<string, unknown>;
    const q = row.q ?? row.question;
    const a = row.a ?? row.answer;
    if (typeof q !== "string" || !q.trim()) fail(file, `faq ${index + 1}번 항목에 질문(q)이 없습니다.`);
    if (typeof a !== "string" || !a.trim()) fail(file, `faq ${index + 1}번 항목에 답변(a)이 없습니다.`);
    return { q: q.trim(), a: a.trim() };
  });
}

/** 한글을 유지하면서 앵커로 쓸 수 있는 id 를 만든다. */
function slugifyHeading(value: string) {
  const base = value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
  return base || "section";
}

const marked = new Marked({ gfm: true, breaks: false });

/**
 * 마크다운을 HTML로 바꾸고, marked 가 낸 출력을 후처리해서
 * h2·h3 에 목차용 id 를 달고 표를 모바일 가로 스크롤 래퍼로 감싼다.
 */
function render(markdown: string): { html: string; headings: BlogHeading[] } {
  const headings: BlogHeading[] = [];
  const used = new Map<string, number>();

  const html = marked
    .parse(markdown, { async: false })
    .replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_whole, level: string, inner: string) => {
      const depth = Number(level) as 2 | 3;
      const label = inner.replace(/<[^>]*>/g, "").trim();
      const base = slugifyHeading(label);
      const seen = used.get(base) ?? 0;
      used.set(base, seen + 1);
      const id = seen ? `${base}-${seen + 1}` : base;
      headings.push({ id, text: label, depth });
      return `<h${depth} id="${id}">${inner}</h${depth}>`;
    })
    .replace(/<table>[\s\S]*?<\/table>/g, (table) => `<div class="blog-table-wrap">${table}</div>`);

  return { html, headings };
}

function loadPosts(): BlogPost[] {
  let files: string[];
  try {
    files = readdirSync(BLOG_DIR).filter((name) => name.endsWith(".md"));
  } catch {
    return [];
  }

  const posts = files.map((file) => {
    const { data, body } = splitFrontmatter(file, readFileSync(join(BLOG_DIR, file), "utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) fail(file, "프런트매터가 key: value 형태가 아닙니다.");
    const front = data as Record<string, unknown>;
    const slug = text(file, front, "slug", true);
    if (!/^[a-z0-9-]+$/.test(slug)) fail(file, `"slug" 는 영문 소문자·숫자·하이픈만 쓸 수 있습니다. (받은 값: ${slug})`);
    if (!body) fail(file, "본문이 비어 있습니다.");
    const published = date(file, front, "date");
    const { html, headings } = render(body);
    return {
      title: text(file, front, "title", true),
      slug,
      description: text(file, front, "description", true),
      date: published,
      updated: date(file, front, "updated", published),
      category: text(file, front, "category", true),
      mainKeyword: text(file, front, "mainKeyword", true),
      thumbnail: text(file, front, "thumbnail", false),
      aiAnswer: text(file, front, "aiAnswer", true),
      faq: faqList(file, front),
      hub: text(file, front, "hub", false),
      draft: isDraft(file, front),
      html,
      headings,
    } satisfies BlogPost;
  });

  const duplicate = posts.find((post, index) => posts.findIndex((other) => other.slug === post.slug) !== index);
  if (duplicate) throw new Error(`[content/blog] slug "${duplicate.slug}" 가 두 개 이상의 파일에 있습니다.`);

  return posts.sort((a, b) => (a.date === b.date ? a.title.localeCompare(b.title, "ko") : b.date.localeCompare(a.date)));
}

/** 파일에서 읽은 전체 글(임시저장 포함). 공개 화면에서는 쓰지 말 것. */
const allBlogPosts: BlogPost[] = loadPosts();

/**
 * 공개된 글만, 최신순.
 *
 * 목록·상세·sitemap·RSS·generateStaticParams 가 전부 이 배열 하나를 본다.
 * 임시저장을 여기서 한 번 걸러내면 어느 경로로도 새어 나가지 않는다.
 * 새 화면을 만들 때도 allBlogPosts 가 아니라 이걸 쓸 것.
 */
export const blogPosts: BlogPost[] = allBlogPosts.filter((post) => !post.draft);

export const toBlogCard = ({ slug, title, description, category, date: published, thumbnail }: BlogPost): BlogCard => ({
  slug,
  title,
  description,
  category,
  date: published,
  thumbnail,
});

export const blogCards: BlogCard[] = blogPosts.map(toBlogCard);

/** "전체" + 글이 있는 카테고리(글 많은 순). */
export const blogCategories: string[] = [
  "전체",
  ...Array.from(
    blogPosts.reduce((counts, post) => counts.set(post.category, (counts.get(post.category) ?? 0) + 1), new Map<string, number>()),
  )
    .sort((a, b) => (b[1] === a[1] ? a[0].localeCompare(b[0], "ko") : b[1] - a[1]))
    .map(([category]) => category),
];

export const findBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

/** 같은 카테고리의 최신 글 3개. */
export const getRelatedBlogPosts = (post: BlogPost, limit = 3) =>
  blogPosts.filter((other) => other.slug !== post.slug && other.category === post.category).slice(0, limit);

export const getBlogHub = (post: BlogPost) => (post.hub ? blogPosts.find((other) => other.slug === post.hub) : undefined);
