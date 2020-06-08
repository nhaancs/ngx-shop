import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styles: [
  ]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart: ShoppingCart
  private userId: string
  private subscription: Subscription

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  async placeOrder(shipping) {
    let result = await this.orderService.placeOrder(this.userId, shipping, this.cart)
    this.router.navigate(['/order-success', result.key])
  }
}
