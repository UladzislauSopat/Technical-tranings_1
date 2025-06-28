import { Routes } from '@angular/router';
import { LoginPage } from './components/login-page/login-page';
import { MainTable } from './components/main-tanle/main-table';

export const routes: Routes = [
    {
        path: '',
        component: LoginPage
    },
    {
        path: 'items',
        component: MainTable
    }
];
