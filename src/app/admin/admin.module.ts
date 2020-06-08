import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminCategoryComponent } from './components/admin-category/admin-category.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminOrderComponent,
    AdminProductComponent,
    ProductFormComponent,
    AdminCategoryComponent,
    CategoryFormComponent
  ],
  exports: [
    AdminOrderComponent,
    AdminProductComponent,
    ProductFormComponent,
    AdminCategoryComponent,
    CategoryFormComponent
  ],
  providers: [
    AdminAuthGuardService
  ]
})
export class AdminModule { }
