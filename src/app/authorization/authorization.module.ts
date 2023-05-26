import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '../guard/auth.guard';



@NgModule({
  declarations: [
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,

  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthorizationModule { }
