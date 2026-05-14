import { inject, Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  private readonly TOKEN_KEY = 'token';
  private cookiesService = inject(SsrCookieService);
  saveToken(token: string, rememberMe: boolean): void {
    this.cookiesService.set(this.TOKEN_KEY, token, {
      expires: rememberMe ? 30 : undefined,
      path: '/',
      sameSite: 'Lax',
      secure: true,
    });
  }

  getToken(): string | null {
    const token = this.cookiesService.get(this.TOKEN_KEY);
    return token && token != '' ? token : null;
  }

  removeToken(): void {
    this.cookiesService.delete(this.TOKEN_KEY, '/');
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
