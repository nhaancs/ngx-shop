import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'shared/models/order';
import { OrderDetailModalComponent } from '../order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})
export class OrderListComponent implements OnInit {
  @Input() orders: Order[]
  
  columns = [
    { prop: 'shipping.name', name: "Name" },
    { prop: 'shipping.phone', name: "Phone" },
    { prop: 'shipping.address', name: "Address"}, 
  ];


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  viewOrderDetail(order: Order) {
    const modalRef = this.modalService.open(OrderDetailModalComponent, { size: 'lg' });
    modalRef.componentInstance.order = order
  }

}
