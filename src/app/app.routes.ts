import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddTechComponent } from './components/add-tech/add-tech.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', title: "RamTech Home", component: HomeComponent},
    {path: 'login', title: "RamTech Login", component: LoginComponent},
    {path: 'register', title: "RamTech Register", component: RegisterComponent},
    {path: 'add-tech', title: "RamTech - Add Tech", component: AddTechComponent, canActivate: [authGuard]},
];
