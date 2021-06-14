import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '@app/login-form/login-form.component';
import { RegisterFormComponent } from '@app/register-form/register-form.component';
import { MyTableComponent } from '@app/my-table/my-table.component';
import { AuthGuard } from './helpers/auth-guard';
import { LogoutGuard } from './helpers/logout-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [LogoutGuard],
  },
  {
    path: 'register',
    component: RegisterFormComponent,
    canActivate: [LogoutGuard],
  },
  {
    path: 'home',
    component: MyTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LogoutGuard],
})
export class AppRoutingModule {}
