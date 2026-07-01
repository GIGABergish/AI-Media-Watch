import { useLang } from '../i18n';
import { demoCases as demoCasesRu, dashboardStats as dashboardStatsRu } from './cases';
import { demoCasesEn, dashboardStatsEn } from './cases.en';
import { DemoCase } from '../types';

/** Demo cases for the current language. */
export function useCases(): DemoCase[] {
  const { lang } = useLang();
  return lang === 'en' ? demoCasesEn : demoCasesRu;
}

/** Dashboard aggregate stats for the current language. */
export function useStats() {
  const { lang } = useLang();
  return lang === 'en' ? dashboardStatsEn : dashboardStatsRu;
}
