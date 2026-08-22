import Link from "next/link";

export function Breadcrumb({ current }: { current: string }) {
  return <nav className="breadcrumb shell" aria-label="현재 위치"><Link href="/">홈</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>;
}
