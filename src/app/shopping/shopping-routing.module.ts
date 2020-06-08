import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

const routes: Routes = [
  {path: 'product', component: ProductComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
  {path: 'order-success/:orderId', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
  {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
