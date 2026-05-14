import { InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const APP_ORIGIN = new InjectionToken<string>('APP_ORIGIN', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) {
      return window.location.origin;
    }
    // Default origin for SSR or testing environments
    return ''; 
  },
});
