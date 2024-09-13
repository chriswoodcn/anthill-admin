import configuraton from "@/configuration.mjs";
import { getServerTranslations } from "@/i18n/server";

export default async function () {
  const { t } = await getServerTranslations();
  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-bg_home bg-center rounded-lg relative">
      <div className="hidden dark:block absolute left-0 right-0 top-0 bottom-0 bg-black/50 z-[2] rounded-lg"></div>
      <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
        <div className="text-white dark:text-white-7 text-5xl font-semibold leading-normal">
          {t("admin-home-welcome")}
        </div>
        <div className="text-white dark:text-white-7 text-xl leading-normal">
          VERSION: {configuraton.Version}
        </div>
        <div className="text-white dark:text-white-7 text-xl leading-normal">
          {configuraton.VersionCode}
        </div>
      </div>
    </div>
  );
}
