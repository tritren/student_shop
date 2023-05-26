import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
  providers: [CategoryService]
})
export class CategoryComponent {


  constructor(private categoryService: CategoryService) { }

  public categoryList$ = this.categoryService.getCategory();


  // public categoryList$: Observable<ICategory[]> = of(
  //   [
  //     {
  //       id: 1,
  //       name: 'Тормозные диски'
  //     },
  //     {
  //       id: 2,
  //       name: 'Тормозные диски2'
  //     },
  //     {
  //       id: 3,
  //       name: 'Тормозные диски3'
  //     },
  //     {
  //       id: 4,
  //       name: 'Тормозные диски4'
  //     }
  //   ]
  // )
}
