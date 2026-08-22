import Link from "next/link";

export function MobileCTA() {
  return <div className="mobile-consult-bar"><Link href="/contact">무료 상담 신청 <span aria-hidden="true">→</span></Link></div>;
}
