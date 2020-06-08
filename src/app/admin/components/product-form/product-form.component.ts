import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Category } from 'shared/models/category';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<Category[]>
  product = new Product()
  id: string

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAll()
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.getPoduct()
    }
  }

  private getPoduct() {
    this.productService.get(this.id)
    .pipe(take(1))
    .subscribe(product => this.product = product || new Product())
  }

  save(data) {
    if (this.id) {
      this.productService.update(this.id, data)
    } else {
      this.productService.create(data)
    }
    this.router.navigate(['admin/product'])
  }

  delete() {
    if (!confirm('Are you want to delete this product?')) {
      return
    }
    this.productService.delete(this.id)
    this.router.navigate(['admin/product'])
  }

}
