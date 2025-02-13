import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:()=>import('./features/public/public.routes').then(m=>m.routes)
    }
];
