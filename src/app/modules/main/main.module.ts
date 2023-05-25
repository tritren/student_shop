import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CategoryComponent } from '../common/category/category.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ProductComponent } from '../common/products/products.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    CategoryComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    //NG_ZORRO
    NzLayoutModule,
    NzGridModule,
    NzTypographyModule,
    NzIconModule,
    NzButtonModule,
    NzInputNumberModule
  ]
})
export class MainModule { }
