import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand brand-footer" href="/" aria-label="거상 정부지원 마케팅센터 홈으로 이동"><span className="footer-logo-surface"><Image className="brand-logo" src="/images/geosang-logo.png" width={38} height={40} alt="거상 정부지원 마케팅센터 로고" sizes="38px" /></span><span className="brand-copy"><strong className="brand-primary">거상</strong><span className="brand-secondary">정부지원 마케팅센터</span></span></Link>
          <p>운영: 거상마케팅센터</p>
          <p className="muted">정부지원사업의 탐색과 준비, 선정 이후 마케팅 실행을 연결합니다.</p>
          <p className="footer-disclaimer">거상 정부지원 마케팅센터는 정부기관이 아닌 민간 마케팅 전문회사 거상마케팅센터가 운영합니다.</p>
        </div>
        <div>
          <strong>빠른 메뉴</strong>
          <div className="footer-links"><Link href="/programs">지원사업 찾기</Link><Link href="/diagnosis">무료 자가진단</Link><Link href="/experts">전문가 소개</Link><Link href="/contact">상담 신청</Link></div>
        </div>
        <div>
          <strong>안내</strong>
          <div className="footer-links"><Link href="/about">회사 소개</Link><Link href="/privacy">개인정보처리방침</Link><Link href="/rss.xml">자료실 RSS</Link><a href="mailto:contact@geosang.co.kr">contact@geosang.co.kr</a></div>
        </div>
      </div>
      <div className="shell footer-bottom">© {new Date().getFullYear()} Geosang Marketing Center. 본 사이트는 정부기관이 아닌 민간 마케팅 서비스입니다.</div>
    </footer>
  );
}
