import { getPrefLangCookie } from "@/actions/language-actions";
import MiniHeaderSection from "./mini-header-section";

export default async function ServerMiniHeader() {
  const prefLangCookie = getPrefLangCookie();

  return <MiniHeaderSection prefLangCookie={prefLangCookie} />;
}
