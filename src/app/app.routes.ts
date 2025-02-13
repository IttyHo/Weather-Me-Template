import { Routes } from '@angular/router';
import { SearchPage } from './weather/weather/pages/search/search.page';

export const appRoutes: Routes = [
    {
        path: 'search',
        component: SearchPage,
    },
    {
        path: 'search/:locationKey',
        component: SearchPage,
    },
    { path: '', redirectTo: 'search', pathMatch: 'full' },
];