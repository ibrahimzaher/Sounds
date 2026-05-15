import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepo } from '@elevate/auth-domain';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const platFormId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const translate = injector.get(TranslateService);
      const toast = injector.get(ToastrService);
      const isSignInRequest = req.url.includes('/auth/');
      const hasAuthHeader = req.headers.has('Authorization');
      const router = injector.get(Router);
      const auth = injector.get(AuthRepo);

      let serverError =
        typeof err.error === 'string'
          ? err.error
          : err.error?.message || err.error?.error;
      switch (err.status) {
        case 0:
          serverError = translate.instant('ERRORS.NETWORK');
          break;
        case 401:
          if (hasAuthHeader || !isSignInRequest) {
            serverError = translate.instant('ERRORS.UNAUTHORIZED');
            auth.cleanData();
            if (isPlatformBrowser(platFormId)) {
              router.navigate(['/auth/login']);
            }
          }
          break;
        case 403:
          serverError = translate.instant('ERRORS.FORBIDDEN');
          break;
        default:
          if (err.status >= 500) {
            serverError = translate.instant('ERRORS.SERVER');
          }
      }

      if (isPlatformBrowser(platFormId)) toast.error(serverError);

      return throwError(() => ({ serverError, status: err.status }));
    })
  );
};
