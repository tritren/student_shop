import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerComponent } from './worker.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { PipesModule } from 'src/app/pipe/order-sum-pipe.module';
@NgModule({
  declarations: [
    WorkerComponent,

  ],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    FormsModule,
    PipesModule,
    //NG-ZORRO
    NzTableModule,
    NzEmptyModule,
    NzButtonModule,
    NzPopoverModule,
    NzRadioModule,
    NzMessageModule
  ]
})
export class WorkerModule { }
