import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', title: 'RamTech Home', component: HomeComponent },
  { path: 'login', title: 'RamTech Login', component: LoginComponent },
  { path: 'register', title: 'RamTech Register', component: RegisterComponent },
  {
    path: 'add-tech',
    title: 'RamTech - Add Tech',
    loadComponent: () =>
      import('./components/add-tech/add-tech.component').then(
        (mod) => mod.AddTechComponent
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
