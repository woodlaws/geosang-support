import Link from "next/link";

export function CTA({ compact = false, title = "지원사업, 어디서부터 시작해야 할지 막막하십니까?", description = "현재 상황을 알려주시면 필요한 지원과 실행 방향부터 정리해드립니다.", label = "무료 상담 신청하기", href = "/contact" }: { compact?: boolean; title?: string; description?: string; label?: string; href?: string }) {
  return (
    <section className={compact ? "final-cta compact" : "final-cta"}>
      <div className="shell final-cta-inner">
        <div><span className="eyebrow light">무료 방향 상담</span><h2>{title}</h2><p>{description}</p></div>
        <Link href={href} className="button button-white">{label} <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
