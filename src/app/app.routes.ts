import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductViewComponent } from '../components/products/view_p/view_p.component';
import { ProductEditComponent } from '../components/products/edit/edit.component';
import { ProductFormComponent } from '../components/products/form/form.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo:'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'products',
        component: ProductsComponent
    },
        {
        path: 'products/create',
        component: ProductFormComponent
    },
    {
        path: 'products/:id',
        component: ProductViewComponent
    },
    {
        path: 'products/:id/edit',
        component: ProductEditComponent
    },

    {
        path: '**',
        component: NotFoundComponent
    }
];
