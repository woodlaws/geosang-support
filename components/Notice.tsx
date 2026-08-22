import { OFFICIAL_NOTICE } from "@/data/site";

export function OfficialNotice() {
  return <p className="official-notice"><span aria-hidden="true">ⓘ</span> {OFFICIAL_NOTICE}</p>;
}
