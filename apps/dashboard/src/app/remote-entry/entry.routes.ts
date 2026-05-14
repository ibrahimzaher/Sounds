import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { TestPage1Component } from '../pages/test-page-1/test-page-1.component';
import { TestPage2Component } from '../pages/test-page-2/test-page-2.component';
import { TestPage3Component } from '../pages/test-page-3/test-page-3.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    children: [
      {
        path: '',
        redirectTo: 'test-1',
        pathMatch: 'full',
      },
      {
        path: 'test-1',
        component: TestPage1Component,
      },
      {
        path: 'test-2',
        component: TestPage2Component,
      },
      {
        path: 'test-3',
        component: TestPage3Component,
      },
    ],
  },
];
