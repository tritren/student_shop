import { NgModule } from "@angular/core";
import { OrderSumPipe } from "./order-sum.pipe";


@NgModule({
  declarations: [
    OrderSumPipe
  ],
  exports: [
    OrderSumPipe
  ]
})
export class PipesModule { }
