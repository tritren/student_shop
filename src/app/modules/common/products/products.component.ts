import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product.medel';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent {

  public category!: string;
  public demoValue: number = 1;

  private productId$ = this.route.queryParams.pipe(
    tap(v => this.category = v?.['category']),
    map(v => v?.['id'])
  );

  public productList$ = this.productId$.pipe(
    switchMap((id) =>
      //метод из сервиса вместо of()
      of(this.mockProductList)
    )
  );


  constructor(private route: ActivatedRoute) { }


  buyItem(item: IProduct) {
    console.log(item);

  }

  mockProductList: IProduct[] = [
    {
      id: 1,
      categoryId: 1,
      description: 'Тормозной диск1111',
      name: 'BREMBO 08.5803.10 ',
      price: 120,
      quantity: 10,
      bought: 1
    },
    {
      id: 2,
      categoryId: 1,
      description: 'Тормозной диск222',
      name: 'ZENTPARTS Z06202  ',
      price: 333,
      quantity: 8,
      bought: 1
    },
  ]

}
