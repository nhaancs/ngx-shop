import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styles: [
  ]
})
export class OrderDetailModalComponent implements OnInit {
  order: Order

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
