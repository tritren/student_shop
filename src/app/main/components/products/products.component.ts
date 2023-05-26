import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';

import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.less'],
  providers: [ProductService]
})
export class ProductComponent {

  public category!: string;
  public demoValue: number = 1;
  public isVisibleModal: boolean = false;
  public finalByItem: IProduct | null = null;

  private category$ = this.route.queryParams
    .pipe(
      tap(v => this.category = v?.['category']),
      map(v => v?.['id'])
    );

  public productList$ = this.category$.pipe(
    switchMap((id) => this.productService.getProductByCategoryId(id))
  );

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }


  handleCancel() {
    this.isVisibleModal = false;
  }

  handleOk() {
    this.isVisibleModal = false;
  }

  buyItem(item: IProduct) {
    this.isVisibleModal = !this.isVisibleModal;
    this.finalByItem  = item
    // this.finalByItem = {

    // }
    console.log(item);

  }
}
// Id
// 	Id_заказчика
// 	Id_менеджера
// 	Id_сотрудника
// 	Дата_создания
// 	Статус
// 	Адрес доставки
// 	Адрес отправки
// 	Описание
// 	Итоговая Цена
