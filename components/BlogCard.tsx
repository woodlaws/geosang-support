import Link from "next/link";
import Image from "next/image";
import type { BlogCard as BlogCardData } from "@/lib/blog";

/** 카테고리를 CSS 클래스로 쓸 수 있게 바꾼다. (자료실 썸네일과 동일한 규칙) */
export const categoryClass = (category: string) => `category-${category.replace(/[·\s]/g, "-")}`;

export function BlogCard({ item }: { item: BlogCardData }) {
  return (
    <article className="library-card blog-card">
      <Link href={`/blog/${item.slug}`} aria-label={`${item.title} 읽어보기`}>
        <div className={`library-thumb blog-thumb ${categoryClass(item.category)}`}>
          {item.thumbnail ? (
            <Image src={item.thumbnail} alt={item.title} fill sizes="(max-width:720px) 100vw, (max-width:1100px) 50vw, 25vw" />
          ) : (
            <>
              <span>{item.category}</span>
              <b aria-hidden="true">GEOSANG</b>
              <i aria-hidden="true">BLOG</i>
            </>
          )}
        </div>
        <div className="library-card-body">
          <div className="library-card-kicker">
            <span>{item.category}</span>
            <time dateTime={item.date}>{item.date.replaceAll("-", ".")}</time>
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="library-card-foot">
            <small>발행일 {item.date.replaceAll("-", ".")}</small>
            <strong>
              읽어보기 <span aria-hidden="true">→</span>
            </strong>
          </div>
        </div>
      </Link>
    </article>
  );
}
