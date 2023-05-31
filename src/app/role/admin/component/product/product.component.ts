import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { BaseDestroyableComponent } from 'src/app/abstrations/base-destroyable.component';
import { ICategory } from 'src/app/models/category.model';
import { IProduct } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
  providers: [ProductService, CategoryService]
})

export class ProductComponent extends BaseDestroyableComponent {

  public product$!: Observable<IProduct[]>;
  public categoryList$: Observable<ICategory[]> = this.categoryService.getCategory();

  public productForm!: UntypedFormGroup
  public isVisible = false;
  public edit = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: UntypedFormBuilder
  ) {
    super();
    this.getAllProduct();
  }


  initForm() {
    this.productForm = this.fb.group({
      categoryID: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      count: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: [null, [Validators.required]],
    })
  }

  getAllProduct() {
    this.product$ = this.productService.getProduct();
  }

  addProduct() {
    this.isVisible = !this.isVisible;
    this.initForm();

  }

  editProduct(data: IProduct) {
    this.edit = true;
    this.isVisible = !this.isVisible;
    this.productForm = this.fb.group({
      id: [data.id],
      categoryID: [data.categoryID, [Validators.required]],
      name: [data.name, [Validators.required]],
      price: [data.price, [Validators.required, Validators.pattern("^[0-9]*$")]],
      count: [data.count, [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: [data.description, [Validators.required]],
    })

  }

  confirmRemove(data: IProduct) {
    this.productService.removeProductById(data)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(() => this.getAllProduct())
  }


  confirmationEdit() {
    if (this.productForm.valid) {
      if (!this.edit) {
        this.productService.addProduct(this.productForm.value)
          .pipe(takeUntil(this.subscriptions))
          .subscribe(() => {
            this.isVisible = false;
            this.getAllProduct()
          })
      } else {
        const product: IProduct = this.productForm.value;
        this.productService.updateProductById(product.id, product)
          .pipe(takeUntil(this.subscriptions))
          .subscribe(() => {
            this.isVisible = false;
            this.getAllProduct()
          })
      }
    }
    this.edit = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
