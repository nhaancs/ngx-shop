import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShippingFormComponent } from './components/check-out/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/check-out/shopping-cart-summary/shopping-cart-summary.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/product/product-filter/product-filter.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingRoutingModule } from './shopping-routing.module';



@NgModule({
  imports: [
    ShoppingRoutingModule, 
    SharedModule
  ],
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductComponent,
    ShoppingCartComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
  ],
})
export class ShoppingModule { }
