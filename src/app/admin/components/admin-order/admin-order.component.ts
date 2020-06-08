import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {
  orders$: Observable<Order[]>

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orders$ = this.orderService.getAll()
  }
}
