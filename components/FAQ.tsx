import { faqs } from "@/data/site";

export function FAQ({ limit }: { limit?: number }) {
  return (
    <section className="section section-soft" id="faq">
      <div className="shell narrow"><div className="section-heading centered"><span className="eyebrow">자주 묻는 질문</span><h2>궁금한 점을 먼저 확인하세요</h2><p>상담 전에 자주 확인하시는 내용을 정리했습니다.</p></div>
        <div className="faq-list">{faqs.slice(0, limit).map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">＋</span></summary><p>{item.a}</p></details>)}</div>
      </div>
    </section>
  );
}
