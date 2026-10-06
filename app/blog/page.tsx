import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BlogList } from "@/components/BlogList";
import { JsonLd } from "@/components/JsonLd";
import { blogCards, blogCategories, blogPosts } from "@/lib/blog";
import { SITE_URL } from "@/data/site";
import { breadcrumbJson, makeMetadata } from "@/lib/seo";

const TITLE = "블로그";
const DESCRIPTION =
  "정부지원사업 신청 준비부터 선정 후 홈페이지·콘텐츠·광고 실행까지, 소상공인이 바로 쓸 수 있는 실무 글을 정리합니다.";

export const metadata: Metadata = {
  ...makeMetadata(TITLE, DESCRIPTION, "/blog"),
  keywords: [
    "정부지원사업 블로그",
    "소상공인 마케팅 블로그",
    "2027 희망리턴패키지",
    "정부지원사업 신청 준비",
    "정부지원사업 선정 후",
    "지원금 홈페이지 제작",
    "소상공인 정부지원사업",
  ],
};

export default function BlogIndex() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbJson([{ name: "홈", path: "/" }, { name: TITLE, path: "/blog" }]), collection]} />
      <section className="sub-hero">
        <div className="shell sub-hero-inner">
          <span className="eyebrow">정부지원사업 실무 블로그</span>
          <h1>지원사업 준비와 실행, 하나씩 풀어서 씁니다</h1>
          <p>{DESCRIPTION}</p>
          <Link className="button button-coral" href="/diagnosis">
            무료 자가진단 시작하기 →
          </Link>
        </div>
      </section>
      <Breadcrumb current={TITLE} />
      <BlogList posts={blogCards} categories={blogCategories} />
    </>
  );
}
