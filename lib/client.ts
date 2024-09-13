"use client";

import { fallbackLng } from '@/i18n/settings';
import { i18next } from '@/i18n/client';

export const translate = (source: string | undefined | null) => {
  try {
    if (source == undefined || source == null) return '--'
    const curLang = i18next.language || fallbackLng
    const obj = JSON.parse(source)
    let result = obj[curLang]
    if (result == undefined) result = obj[fallbackLng]
    return result
  } catch (error) {
    return '--'
  }
}
