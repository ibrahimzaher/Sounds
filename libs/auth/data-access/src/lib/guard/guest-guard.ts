import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStorageService } from '../services/auth-storage.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const storage = inject(AuthStorageService);
  const router = inject(Router);

  if (!storage.hasToken()) {
    return true;
  }

  router.navigate(['/'], { replaceUrl: true });
  return false;
};
