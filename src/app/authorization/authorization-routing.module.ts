import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization.component';


const routes: Routes = [
  {
    path: '', component: AuthorizationComponent, children: [
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      { path: 'reg', loadChildren: () => import('./reg-user/reg-user.module').then(m => m.RegModule) },
      { path: 'confirm-email', loadChildren: () => import('./confirm-email/email-confirm.module').then(m => m.EmailConfirmModule) }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
