import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from "ng-zorro-antd/form";
import { ReactiveFormsModule } from "@angular/forms";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { RegRoutingModule } from './reg-user-routing.module';
import { RegComponent } from './reg-user.component';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    RegComponent
  ],
  imports: [
    CommonModule,
    RegRoutingModule,
    ReactiveFormsModule,
    //NGZORRO
    NzFormModule,
    NzInputModule,
    NzNotificationModule,
    NzButtonModule,
    NzTypographyModule,
    NzIconModule,
  ]
})
export class RegModule { }
