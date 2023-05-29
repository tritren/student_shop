import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CategoryComponent } from './components/category/category.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/products/products.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    MainComponent,
    CategoryComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    //NG_ZORRO
    NzLayoutModule,
    NzGridModule,
    NzTypographyModule,
    NzIconModule,
    NzButtonModule,
    NzInputNumberModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
  ]
})
export class MainModule { }
