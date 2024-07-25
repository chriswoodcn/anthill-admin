import { languages, fallbackLng } from "@/i18n/settings";
import { useTranslation } from "@/i18n";
import { ReactNode } from "react";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function Layout({ children }: { children: ReactNode }) {
  return children;
}
