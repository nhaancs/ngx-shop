import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser
  cart$: Observable<ShoppingCart>
  cartItemCount: number
  isMenuCollapsed = true;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser)
    this.cart$ = await this.shoppingCartService.getCart()
  }

  logout() {
    this.authService.logout()
      .then(_ => this.router.navigate(['/login']))
  }
}
