import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegComponent} from "./reg-user.component";

const routes: Routes = [
  {path: '', component: RegComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegRoutingModule { }
