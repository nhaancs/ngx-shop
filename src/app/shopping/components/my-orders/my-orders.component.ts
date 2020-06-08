import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders: Order[]
  subscription: Subscription

  constructor(
    private authService: AuthService, 
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  
  private getOrders() {
    this.subscription = this.authService.appUser$
    .pipe(switchMap(user => this.orderService.getAll(user.key)))
    .subscribe(orders => {
      this.orders = orders
    })
  }
}
