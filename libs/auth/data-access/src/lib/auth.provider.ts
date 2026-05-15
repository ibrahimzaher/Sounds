import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
  Provider,
} from '@angular/core';
import {
  AuthRepo,
  AuthState,
  eAuthStateService as AuthStateService,
} from '@elevate/auth-domain';
import { API_CONFIG, ApiConfigToken } from './api/api-config.token';
import { AuthApiRepo } from './api/auth-api.repo';
import { catchError, of } from 'rxjs';
import { AuthStorageService } from './services/auth-storage.service';

export function provideAuth(
  config: ApiConfigToken
): (Provider | EnvironmentProviders)[] {
  return [
    {
      provide: API_CONFIG,
      useValue: config,
    },
    {
      provide: AuthRepo,
      useClass: AuthApiRepo,
    },
    AuthStateService,
    {
      provide: AuthState,
      useExisting: AuthStateService,
    },
    provideAppInitializer(() => {
      const storage = inject(AuthStorageService);
      const authRepo = inject(AuthRepo);
      return storage.hasToken()
        ? authRepo.profileData().pipe(catchError(() => of(null)))
        : of(null);
    }),
  ];
}
