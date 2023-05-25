import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CategoryComponent } from '../common/category/category.component';
import { ProductComponent } from '../common/products/products.component';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      { path: "", pathMatch: 'full', component: CategoryComponent },
      { path: "product", pathMatch: 'full', component: ProductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
