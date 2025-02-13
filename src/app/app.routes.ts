import { Routes } from '@angular/router';
import { SearchPage } from './weather/weather/pages/search/search.page';

export const appRoutes: Routes = [
    { path: 'search', loadComponent: () => import('./weather/weather/pages/search/search.page').then(s => s.SearchPage) },
    { path: '', redirectTo: 'search', pathMatch: 'full' },
];