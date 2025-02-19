import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
    {
        path:'',
        component:LayoutComponent,
        children:[
            {path:'dashboard', component:DashboardComponent },
            {path:'', redirectTo:'/admin/dashboard', pathMatch:'full'},
        ]

    }
];
