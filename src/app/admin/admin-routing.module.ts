import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'shared/services/auth-guard.service';

import { AdminCategoryComponent } from './components/admin-category/admin-category.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

const routes: Routes = [
  {
    path: 'admin/product/new', 
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/product/:id', 
    component: ProductFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/product', 
    component: AdminProductComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/order', 
    component: AdminOrderComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/category/new', 
    component: CategoryFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/category/:id', 
    component: CategoryFormComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/category', 
    component: AdminCategoryComponent, 
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
