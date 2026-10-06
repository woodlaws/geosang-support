"use client";

import { useSyncExternalStore } from "react";
import type { BlogCard as BlogCardData } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";

const ALL = "전체";
const CATEGORY_CHANGED = "blog-category-changed";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CATEGORY_CHANGED, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CATEGORY_CHANGED, onChange);
  };
}

const readCategory = () => new URLSearchParams(window.location.search).get("category") || ALL;
const serverCategory = () => ALL;

/**
 * 카테고리 필터. 선택값은 URL 쿼리 하나만 바라본다.
 *
 * `useSearchParams` 를 쓰지 않는다. 그 훅은 정적 프리렌더를 Suspense 폴백으로
 * 떨어뜨려 빌드된 HTML에서 글 목록이 통째로 빠지고, 검색엔진과 AI 크롤러가 빈 목록을
 * 보게 된다. 대신 URL 을 외부 저장소로 구독해서, 서버 스냅샷은 항상 "전체"(= 모든 카드가
 * 정적 HTML에 포함)이고 클라이언트에서만 쿼리값을 읽는다.
 */
export function BlogList({ posts, categories }: { posts: BlogCardData[]; categories: string[] }) {
  const current = useSyncExternalStore(subscribe, readCategory, serverCategory);
  const selected = categories.includes(current) ? current : ALL;

  function select(category: string) {
    const next = new URLSearchParams(window.location.search);
    if (category === ALL) next.delete("category");
    else next.set("category", category);
    window.history.replaceState(null, "", `${window.location.pathname}${next.size ? `?${next}` : ""}`);
    window.dispatchEvent(new Event(CATEGORY_CHANGED));
  }

  const results = selected === ALL ? posts : posts.filter((post) => post.category === selected);

  return (
    <section className="section section-soft all-library" id="blog-posts">
      <div className="shell">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">전체 글</span>
            <h2>관심 있는 주제부터 읽어보세요</h2>
          </div>
          <p>최신 발행순으로 정리했습니다.</p>
        </div>

        {categories.length > 1 && (
          <div className="filter-chips" aria-label="블로그 카테고리">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={selected === category ? "active" : ""}
                aria-pressed={selected === category}
                onClick={() => select(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="filter-status">
          <b>{results.length}개의 글</b>
          <div>{selected !== ALL && <button onClick={() => select(ALL)}>카테고리: {selected} ×</button>}</div>
        </div>

        {results.length ? (
          <div className="all-library-grid">
            {results.map((post) => (
              <BlogCard key={post.slug} item={post} />
            ))}
          </div>
        ) : (
          <div className="library-empty">
            <span aria-hidden="true">⌕</span>
            <h3>해당 카테고리의 글이 아직 없습니다.</h3>
            <p>다른 카테고리를 선택하거나 전체 글을 확인해보세요.</p>
            <div className="button-row">
              <button className="button button-primary" onClick={() => select(ALL)}>
                전체 글 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
