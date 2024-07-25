import { fallbackLng } from "@/i18n/settings"
import nextConfig from "@/next.config.mjs"

export const withBasePath = (path: string) => path.startsWith("/") ? `${nextConfig.basePath}${path}` : `${nextConfig.basePath}/${path}`

export const withLangPath = (path: string, lang?: string) => path.startsWith("/") ? `/${lang || fallbackLng}${path}` : `/${lang || fallbackLng}/${path}`

export const withComposePath = (path: string, lang?: string) => withBasePath(withLangPath(path, lang))