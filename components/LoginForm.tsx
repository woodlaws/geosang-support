"use client";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter(), params = useSearchParams();
  const [state, setState] = useState<"idle"|"sending"|"error">("idle"), [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (state === "sending") return; setState("sending"); setMessage("");
    const fd = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { setState("error"); setMessage(result.message || "로그인하지 못했습니다."); return; }
    const next = params.get("next"); router.replace(next?.startsWith("/") ? next : "/portal"); router.refresh();
  }
  return <form className="login-form" onSubmit={submit}><label>이메일<input name="email" type="email" autoComplete="email" required /></label><label>비밀번호<input name="password" type="password" autoComplete="current-password" minLength={8} required /></label><button className="button button-primary" disabled={state === "sending"}>{state === "sending" ? "로그인 중…" : "고객 전용 로그인"}</button>{message && <p className="form-error" role="alert">{message}</p>}<small>고객 계정은 계약 후 관리자가 초대합니다. 공개 회원가입은 제공하지 않습니다.</small></form>;
}
