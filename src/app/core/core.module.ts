import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'shared/shared.module';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    CoreRoutingModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
  ],
})
export class CoreModule { }
