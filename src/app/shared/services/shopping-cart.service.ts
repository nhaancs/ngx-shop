import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable()
export class ShoppingCartService {
  private itemsRef: AngularFireList<any>;

  constructor(private afDatabase: AngularFireDatabase) { 
    this.itemsRef = this.afDatabase.list('/shopping-carts')
  }

  async clearCart(): Promise<void> {
    let cartId = await this.getOrCreateCartId()
    return this.afDatabase.object('/shopping-carts/' + cartId + '/items').remove()
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId()
    return this.afDatabase.object('/shopping-carts/' + cartId)
    .valueChanges()
    .pipe(map(this.toModel))
  }

  addToCart(product: Product) {
    this.updateItem(product, 1)
  }
  
  removeFromCart(product: Product) {
    this.updateItem(product, -1)
  }

  private getCartItemRef(cartId: string, productId: string){
    return this.afDatabase.object('/shopping-carts/' + cartId + '/items/' + productId)
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId')
    if (!cartId) {
      let result = await this.create()
      localStorage.setItem('cartId', result.key)
      return result.key
    } 

    return cartId
  }
  
  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId()
    let cartItemRef = this.getCartItemRef(cartId, product.key)

    cartItemRef.valueChanges()
    .pipe(take(1))
    .subscribe(item => {
      let quantity = ((item && (item as any).quantity) || 0) + change
      if (quantity === 0) {
        return cartItemRef.remove()
      }

      return cartItemRef.update(
        ShoppingCartItem.toRequest({...product, quantity: quantity})
      )
    })
  }

  private create() {
    return this.itemsRef.push({
      dateCreated: new Date().getTime()
    })
  }

  private toModel = res => res ? ShoppingCart.fromResponse(res) : null

  private toModels = (res: any[]) => res.map(this.toModel)
}
