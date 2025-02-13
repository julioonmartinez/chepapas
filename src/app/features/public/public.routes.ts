import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { RatingComponent } from './pages/rating/rating.component';

export const routes: Routes = [
    {
        path:'',
        component:LayoutComponent,
        children:[
            {path:'home', component:HomeComponent },
            {path:'rating', component:RatingComponent,},
            {path:'', redirectTo:'/home', pathMatch:'full'},
        ]

    }
];
