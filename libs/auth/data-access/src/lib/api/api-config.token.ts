import { InjectionToken } from '@angular/core';

export interface ApiConfigToken {
  baseUrl: string;
}

export const API_CONFIG = new InjectionToken<ApiConfigToken>('API_CONFIG');
