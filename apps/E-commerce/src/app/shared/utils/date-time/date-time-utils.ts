export function getLocaleFromLanguage(language: string): string {
  return language === 'ar' ? 'ar-EG' : 'en-US';
}

export function formatLocalizedDate(dateString: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function formatLocalizedTime(dateString: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateString));
}
