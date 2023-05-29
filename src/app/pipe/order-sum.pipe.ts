import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'orderSum'
})

export class OrderSumPipe implements PipeTransform {
  transform(value: any[], ...args: any[]): any {
    return value.reduce((accumulator: number, currentValue) => accumulator + currentValue.price, 0);
  }
}
