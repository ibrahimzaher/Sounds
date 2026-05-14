import { Route } from '@angular/router';
import { guestGuard } from '@elevate/auth-data-access';
import type { SeoMeta } from './core/interfaces/seo-meta.interface';
import { loadRemote } from '@module-federation/enhanced/runtime';

const notFoundSeo: SeoMeta = {
  title: 'Page Not Found | Elevate Gifts',
  description:
    'The page you are looking for could not be found. Return to Elevate Gifts to keep shopping flowers, gifts, and curated occasion collections.',
  robots: 'noindex, nofollow',
};

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      loadRemote<typeof import('dashboard/Routes')>('dashboard/Routes').then(
        (m) => m!.remoteRoutes
      ),
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./feature/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'not-found',
    data: {
      seo: notFoundSeo,
    },
    loadComponent: () =>
      import('./feature/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/main-layout/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
