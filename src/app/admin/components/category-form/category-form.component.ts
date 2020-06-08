import { Component, OnInit } from '@angular/core';
import { Category } from 'shared/models/category';
import { CategoryService } from 'shared/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styles: [
  ]
})
export class CategoryFormComponent implements OnInit {
  category = new Category()
  id: string

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.getCategory()
    }
  }

  private getCategory() {
    this.categoryService.get(this.id)
    .pipe(take(1))
    .subscribe(category => this.category = category || new Category())
  }

  save(data: Category) {
    if (this.id) {
      this.categoryService.update(this.id, data)
    } else {
      this.categoryService.create(data)
    }
    this.router.navigate(['admin/category'])
  }

  delete() {
    if (!confirm('Are you want to delete this category?')) {
      return
    }
    this.categoryService.delete(this.id)
    this.router.navigate(['admin/category'])
  }

}
