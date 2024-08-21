// third party
import "@mantine/core/styles.css";
import "@/styles/tailwind.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Nunito } from "next/font/google";
// i18next
import i18next, { dir } from "i18next";
import { detectLanguage, getServerTranslations } from "@/i18n/server";
import { I18nProvider } from "@/i18n/client";
// custom
import { withBasePath } from "@/lib";
import ComposedProvider from "@/components/compose/ComposedProvider";
import configuraton, {
  PrimaryColors,
  BlackColors,
  WhiteColors,
} from "@/configuration.mjs";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});
export async function generateMetadata() {
  const { t } = await getServerTranslations();
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = await detectLanguage();
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link rel="icon" href={withBasePath("/assets/anthill.svg")} />
        <ColorSchemeScript />
      </head>
      <body className={nunito.variable}>
        <I18nProvider language={lng}>
          <MantineProvider
            theme={{
              primaryColor: "anthill-primary",
              black: "anthill-black",
              // white: "anthill-white",
              fontFamily: "var(--font-nunito)",
              colors: {
                "anthill-primary": PrimaryColors as any,
                "anthill-black": BlackColors as any,
                "anthill-white": WhiteColors as any,
              },
            }}
          >
            <ComposedProvider>{children}</ComposedProvider>
          </MantineProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
