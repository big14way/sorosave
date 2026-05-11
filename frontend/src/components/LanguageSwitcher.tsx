"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <label className="flex items-center">
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        onChange={(event) => {
          router.replace(pathname, {
            locale: event.target.value as Locale,
          });
        }}
        className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:bg-gray-50"
      >
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {t(`locales.${item}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
