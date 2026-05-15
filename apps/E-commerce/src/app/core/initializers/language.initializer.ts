import { DOCUMENT } from '@angular/common';
import { inject, provideAppInitializer } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { firstValueFrom } from 'rxjs';

export function provideLanguageInitializer() {
  return provideAppInitializer(() => {
    const document = inject(DOCUMENT);
    const cookieService = inject(SsrCookieService);
    const translateService = inject(TranslateService);

    const lang = cookieService.get('lang') || 'en';
    const direction = lang === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', lang);

    translateService.setFallbackLang('en');
    return firstValueFrom(translateService.use(lang));
  });
}
