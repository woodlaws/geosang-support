import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * 이 프로젝트는 그동안 ESLint 설정 없이 typecheck + build 로만 검증해 왔다.
 * 린트를 처음 켜면서, eslint-config-next 16 이 새로 들여온 React Compiler 규칙에
 * 걸리는 기존 컴포넌트는 아래에 파일 단위로 적어 경고로 낮췄다.
 * 새로 쓰는 코드에는 규칙이 그대로 error 로 적용된다.
 * 목록은 실제로 고칠 때마다 한 줄씩 지우는 용도다.
 */
const preexisting = {
  files: [
    "app/admin/page.tsx",
    "components/AdvancedDiagnosisWizard.tsx",
    "components/AfterSelectionConsultFlow.tsx",
    "components/ContactWizard.tsx",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "warn",
    "react-hooks/purity": "warn",
    "react-hooks/set-state-in-effect": "warn",
  },
};

const config = [
  // 빌드 산출물은 하위 경로까지 전부 제외한다. ".next/**" 만 적으면 최상위만 걸러져서,
  // .claude/worktrees/<이름>/.next 같은 다른 세션의 빌드 결과가 린트 대상으로 딸려 들어온다.
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/out/**",
      "**/dist/**",
      "**/.wrangler/**",
      "**/.vercel/**",
      ".claude/**",
      "next-env.d.ts",
    ],
  },
  ...coreWebVitals,
  ...typescript,
  preexisting,
];

export default config;
