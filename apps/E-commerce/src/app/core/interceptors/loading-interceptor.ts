import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const SKIP_GLOBAL_LOADING = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const isExcluded =
    req.context.get(SKIP_GLOBAL_LOADING) ||
    req.url.includes('/i18n/') ||
    req.url.includes('/profile-data') ||
    req.url.endsWith('.json');

  if (isExcluded) {
    return next(req);
  }
  const loading = inject(LoadingService);
  loading.showLoading();
  return next(req).pipe(finalize(() => loading.hideLoading()));
};
