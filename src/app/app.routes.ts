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
        path: 'alta-juego',
        loadComponent: () =>
        import('./components/alta-juego/alta-juego.component').then(
            (m) => m.AltaJuegoComponent
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
