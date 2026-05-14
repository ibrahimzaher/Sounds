import { inject, Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private cookiesService = inject(SsrCookieService);

  set(name: string, value: any, rememberMe: boolean): void {
    const dataToStore =
      typeof value === 'object' ? JSON.stringify(value) : value;

    this.cookiesService.set(name, dataToStore, {
      expires: rememberMe ? 30 : undefined,
      path: '/',
      sameSite: 'Lax',
    });
  }
  get(name: string) {
    const data = this.cookiesService.get(name);

    if (!data || data === '') return null;

    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  delete(name: string): void {
    this.cookiesService.delete(name, '/');
  }

  deleteAll(): void {
    this.cookiesService.deleteAll('/');
  }
}