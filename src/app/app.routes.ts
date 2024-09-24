import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () =>
        import('./pages/home/home.component').then(
            (m) => m.HomeComponent
        ),
    },
    {
        path: 'admin-panel',
        loadComponent: () =>
        import('./pages/admin-panel/admin-panel.component').then(
            (m) => m.AdminPanelComponent
        ),
    },
    {
        path: 'prueba',
        loadComponent: () =>
        import('./components/lista-juegos/lista-juegos.component').then(
            (m) => m.ListaJuegosComponent
        ),
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full',
    },
];
