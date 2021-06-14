import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '@app/login-form/login-form.component';
import { RegisterFormComponent } from '@app/register-form/register-form.component';
import { MyTableComponent } from '@app/my-table/my-table.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
  {
    path: 'home',
    component: MyTableComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'logout',
    component: LoginFormComponent,
    data: {
      redirectTo: 'login',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
