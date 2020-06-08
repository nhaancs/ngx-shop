import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'shared/models/category';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styles:[]
})
export class ProductFilterComponent {
  @Input() selectedCategory: string
  categories$: Observable<Category[]>

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getAll()
  }
}
