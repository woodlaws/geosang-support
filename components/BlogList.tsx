"use client";

import { useEffect, useState } from "react";
import type { BlogCard as BlogCardData } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";

const ALL = "전체";

/**
 * 카테고리 필터.
 *
 * `useSearchParams` 를 쓰지 않는다. 그 훅은 정적 프리렌더를 Suspense 폴백으로
 * 떨어뜨려 빌드된 HTML에 글 목록이 빠지고, 검색엔진과 AI 크롤러가 빈 목록을 보게 된다.
 * 대신 기본값 "전체" 로 서버에서 모든 카드를 렌더하고, 마운트 후에 URL 쿼리를 읽어
 * 선택을 복원하고 history 로만 동기화한다.
 */
export function BlogList({ posts, categories }: { posts: BlogCardData[]; categories: string[] }) {
  const [selected, setSelected] = useState(ALL);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("category");
    if (fromUrl && categories.includes(fromUrl)) setSelected(fromUrl);
  }, [categories]);

  function select(category: string) {
    setSelected(category);
    const next = new URLSearchParams(window.location.search);
    if (category === ALL) next.delete("category");
    else next.set("category", category);
    window.history.replaceState(null, "", `${window.location.pathname}${next.size ? `?${next}` : ""}`);
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
