import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartSummaryComponent {
  @Input() cart: ShoppingCart
}
