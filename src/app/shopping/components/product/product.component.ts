import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]>
  cart$: Observable<ShoppingCart>
  selectedCategory: string
  
  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.getProducts()
    this.getShoppingCart()
  }

  private async getShoppingCart() {
    this.cart$ = await this.shoppingCartService.getCart()
  }

  private getProducts() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.selectedCategory = queryParams.get('category')
      if (this.selectedCategory) {
        this.products$ = this.productService.getAll(this.selectedCategory)
      } else {
        this.products$ = this.productService.getAll()
      }
    })
  }
}
