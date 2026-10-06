import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/BlogArticle";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, findBlogPost, getBlogHub, getRelatedBlogPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/data/site";
import { breadcrumbJson, faqJson } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${slug}`;
  const image = post.thumbnail || "/og-image.png";
  const brandedTitle = `${post.title} | ${SITE_NAME}`;
  return {
    title: post.title,
    description: post.description,
    keywords: [post.mainKeyword, post.category],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: SITE_NAME,
      url,
      title: brandedTitle,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: brandedTitle, description: post.description, images: [image] },
    robots: { index: true, follow: true },
  };
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/images/geosang-logo.png` },
    mainEntityOfPage: url,
    image: new URL(post.thumbnail || "/og-image.png", SITE_URL).toString(),
    articleSection: post.category,
    keywords: post.mainKeyword,
  };

  const schema: Record<string, unknown>[] = [
    article,
    breadcrumbJson([
      { name: "홈", path: "/" },
      { name: "블로그", path: "/blog" },
      { name: post.title, path: `/blog/${slug}` },
    ]),
  ];
  if (post.faq.length) schema.push(faqJson(post.faq));

  return (
    <>
      <JsonLd data={schema} />
      <BlogArticle post={post} related={getRelatedBlogPosts(post)} hub={getBlogHub(post)} />
    </>
  );
}
