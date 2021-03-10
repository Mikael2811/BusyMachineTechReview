import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {UserSignUpComponent} from './user-sign-up/user-sign-up.component';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: '',
    component: LoginComponent
  },
  { 
    path: 'user-sign-up',
    component: UserSignUpComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'orders',
    component:OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
