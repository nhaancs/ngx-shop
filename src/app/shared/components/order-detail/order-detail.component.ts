import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailComponent {
  @Input() order: Order
}
