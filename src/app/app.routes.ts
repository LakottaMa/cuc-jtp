import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddColorsComponent } from './add-colors/add-colors.component';


export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'colors', component: AddColorsComponent },
    { path: 'colors/:id', component: AddColorsComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
