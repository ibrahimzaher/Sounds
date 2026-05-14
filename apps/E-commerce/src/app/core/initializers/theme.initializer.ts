import { DOCUMENT } from '@angular/common';
import { inject, provideAppInitializer } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Theme } from '../enums/theme.enum';

export function provideThemeInitializer() {
    return provideAppInitializer(() => {
        const document = inject(DOCUMENT);
        const cookieService = inject(SsrCookieService);
        const theme = cookieService.get('theme') as Theme;
        document.documentElement.classList.toggle('dark', theme === Theme.DARK);
    });
}
