import { Component } from '@angular/core';
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

}
