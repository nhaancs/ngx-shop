import { Component } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  products: Product[]
  filteredProducts: Product[]
  subscription: Subscription
  ColumnMode = ColumnMode;
  columns = [{ name: 'Title' }, { name: 'Category' }, { name: 'Price' }];

  constructor(productService: ProductService) {
    this.subscription = productService.getAll()
      .subscribe(
        products => this.filteredProducts = this.products = products || []
      )
  }

  filter(query: string) {
    this.filteredProducts = query ? 
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
