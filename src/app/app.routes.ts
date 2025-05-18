// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from '../app/page/login/login.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'login' }
];
