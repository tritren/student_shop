import { Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { StorageForCartItemService } from 'src/app/service/local-storage-cart.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./product.component.less'],
  providers: [ProductService]
})

export class ProductComponent   {

  public orderForm!: UntypedFormGroup;
  public category!: string;
  public demoValue: number = 1;
  public isVisibleModal: boolean = false;
  public finalByItem!: IProduct;
  public userId: number | null = null;

  private category$ = this.route.queryParams
    .pipe(
      tap(v => this.category = v?.['category']),
      map(v => v?.['id'])
    );

  public productList$ = this.category$.pipe(switchMap((id) => this.productService.getProductByCategoryId(id)));

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private localCartStorService: StorageForCartItemService,
  ) { }


  buyItem(item: IProduct) {
    this.localCartStorService.addItem(item)
  }
}
