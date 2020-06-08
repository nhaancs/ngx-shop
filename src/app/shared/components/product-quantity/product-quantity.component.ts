import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styles: [
  ]
})
export class ProductQuantityComponent {
  @Input() product: Product
  @Input() shoppingCart: ShoppingCart

  constructor(private shoppingCartService: ShoppingCartService) {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product)
  }

  removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product)
  }
}
