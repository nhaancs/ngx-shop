import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'shared/models/category';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styles: [
  ]
})
export class AdminCategoryComponent implements OnInit {
  categories$: Observable<Category[]>

  constructor(private categoryService: CategoryService, ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll()
  }

}
