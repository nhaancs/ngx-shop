import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  loading = true 
  orderId: string
  order: Order

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId')
    if (!this.orderId) {
      this.router.navigate(['/'])
    }

    this.getOrder()
  }

  private getOrder() {
    this.orderService.get(this.orderId)
    .pipe(take(1))
    .subscribe(order => {
      if (!order) {
        this.router.navigate(['/'])
        return
      }

      this.order = order
      this.loading = false
    })
  }

}
