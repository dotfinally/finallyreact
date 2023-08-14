/**
 * Get locale from browser
 * @returns locale
 */
export function getBrowserLocale(): string {
  if (typeof window === 'undefined') {
    return 'en';
  }

  if (window?.navigator?.['languages'] && window?.navigator?.['languages']?.length) {
    return navigator?.['languages']?.[0];
  } else {
    return window?.navigator?.['userLanguage'] || navigator?.['language'] || navigator?.['browserLanguage'] || 'en';
  }
}

export default getBrowserLocale;
