import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog";

/** 모든 글 하단에 같은 문구로 들어가는 상담 CTA. */
const CONSULT_COPY =
  "거상마케팅센터는 임헌수 대표의 10년 넘는 소상공인 교육·컨설팅 노하우를 바탕으로, 희망리턴패키지 등 정부지원사업 신청부터 선정 후 마케팅까지 함께하는 소상공인 전문 대행사입니다.";

const formatDate = (value: string) => value.replaceAll("-", ".");

/**
 * 블로그 상세. 클라이언트 JS 없이 전부 서버에서 렌더한다.
 * 목차는 앵커, FAQ는 <details> 라 스크립트가 없어도 동작한다.
 */
export function BlogArticle({ post, related, hub }: { post: BlogPost; related: BlogPost[]; hub?: BlogPost }) {
  return (
    <div className="article-page blog-article">
      <section className="article-head">
        <div className="shell narrow">
          <span className="article-category">{post.category}</span>
          <div className="article-head-meta blog-head-meta">
            <time dateTime={post.date}>발행 {formatDate(post.date)}</time>
            {post.updated !== post.date && <time dateTime={post.updated}>수정 {formatDate(post.updated)}</time>}
          </div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
        </div>
      </section>

      <nav className="breadcrumb" aria-label="현재 위치">
        <div className="shell">
          <Link href="/">홈</Link>
          <span aria-hidden="true">›</span>
          <Link href="/blog">블로그</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{post.title}</span>
        </div>
      </nav>

      <div className="shell article-layout">
        <aside className="article-side">
          {post.headings.length > 0 && (
            <details className="article-toc" open>
              <summary>
                목차 <span>접기·펼치기</span>
              </summary>
              <nav aria-label="글 목차">
                {post.headings.map((heading, index) => (
                  <a key={heading.id} href={`#${heading.id}`} className={heading.depth === 3 ? "toc-sub" : undefined}>
                    <span>{heading.depth === 3 ? "·" : String(index + 1).padStart(2, "0")}</span>
                    {heading.text}
                  </a>
                ))}
              </nav>
            </details>
          )}
          {hub && (
            <div className="blog-hub">
              <strong>상위 가이드</strong>
              <Link href={`/blog/${hub.slug}`}>{hub.title} →</Link>
            </div>
          )}
        </aside>

        <main className="article-main">
          {post.thumbnail && (
            <figure className="blog-hero-thumb">
              <Image src={post.thumbnail} alt={post.title} width={900} height={900} sizes="(max-width:720px) 100vw, 460px" priority />
            </figure>
          )}

          <section className="blog-answer" aria-labelledby="blog-answer-title">
            <b id="blog-answer-title">요약 답변</b>
            {post.aiAnswer
              .split(/\n{2,}|\n/)
              .map((line) => line.trim())
              .filter(Boolean)
              .map((line) => (
                <p key={line}>{line}</p>
              ))}
          </section>

          <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faq.length > 0 && (
            <section className="blog-faq" aria-labelledby="blog-faq-title">
              <span>자주 묻는 질문</span>
              <h2 id="blog-faq-title">이 주제에서 가장 많이 받는 질문</h2>
              <div className="faq-list">
                {post.faq.map((item) => (
                  <details key={item.q}>
                    <summary>
                      {item.q}
                      <span aria-hidden="true">＋</span>
                    </summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="article-related">
              <span>관련 글</span>
              <h2>같은 주제의 글을 이어서 읽어보세요</h2>
              <div>
                {related.map((item) => (
                  <Link key={item.slug} href={`/blog/${item.slug}`}>
                    <small>{item.category}</small>
                    <b>{item.title}</b>
                    <p>{item.description}</p>
                    <span>읽어보기 →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <aside className="article-disclaimer">
            <b>면책 안내</b>
            <p>
              이 글은 공고와 실행 절차를 쉽게 이해하기 위한 참고 정보입니다. 최종 신청 대상, 제출 서류, 지원 규모, 일정과 집행 가능 여부는 해당 연도의
              주관기관 공식 공고와 협약을 기준으로 확인해야 합니다. 거상마케팅센터는 정부기관이 아니며 지원사업 선정이나 지원금 수령, 특정 성과를
              보장하지 않습니다.
            </p>
          </aside>

          <section className="article-context-cta blog-consult-cta">
            <div>
              <small>소상공인 전문 대행사</small>
              <h2>다음 단계를 함께 정리해드립니다</h2>
              <p>{CONSULT_COPY}</p>
            </div>
            <div className="blog-consult-actions">
              <Link className="button button-white" href="/diagnosis">
                무료 자가진단
              </Link>
              <Link className="button button-coral" href="/contact">
                상담 신청
              </Link>
            </div>
          </section>
        </main>
      </div>

      <div className="article-mobile-cta">
        <Link href={`/contact?source=blog&reference=${encodeURIComponent(post.slug)}`}>상담 신청 →</Link>
      </div>
    </div>
  );
}
