import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'authuntction',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
];
