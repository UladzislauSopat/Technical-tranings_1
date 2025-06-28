import { Routes } from '@angular/router';
import { LoginPage } from './components/login-page/login-page';
import { MainTable } from './components/main-table/main-table';
import { Products } from './pages/products/products';

export const routes: Routes = [
    {
        path: '',
        component: LoginPage
    },
    {
        path: 'items',
        component: Products
    }
];
