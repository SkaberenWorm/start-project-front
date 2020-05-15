import { Routes } from '@angular/router';

import { DefaultLayoutComponent } from './layouts/default/default-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: DefaultLayoutComponent,
    loadChildren: './paginas/inicio/inicio.module#InicioModule'
  },

];
