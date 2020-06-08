import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';

import { OrderDetailModalComponent } from './components/order-detail-modal/order-detail-modal.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent,
    OrderDetailModalComponent,
    OrderListComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent,
    OrderDetailModalComponent,
    OrderListComponent,
    LoadingSpinnerComponent,
    NgxDatatableModule,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
