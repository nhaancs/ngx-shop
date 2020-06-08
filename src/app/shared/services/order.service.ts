import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  private itemsRef: AngularFireList<any>;

  constructor(
    private afDatabase: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) { 
    this.itemsRef = this.afDatabase.list('/orders')
  }

  async placeOrder(userId: string, shipping: any, cart: ShoppingCart) {
    let order = Order.toRequest(userId, shipping, cart)
    let result = await this.itemsRef.push(order)
    this.shoppingCartService.clearCart()

    return result
  }

  get(orderId: string): Observable<Order> {
    return this.afDatabase.object('/orders/' + orderId)
      .snapshotChanges()
      .pipe(map(this.toModel))
  }

  getAll(userId?: string): Observable<Order[]> {
    let query = null
    if (userId) {
      query = ref => {
        return ref.orderByChild('userId').equalTo(userId)
      }
    }

    return this.afDatabase.list('/orders', query)
      .snapshotChanges()
      .pipe(map(this.toModels))
  }

  private toModel = res => res.key ? Order.fromResponse({
    key: res.key,
    ...res.payload.exportVal()
  }): null

  private toModels = (res: any[]) => res.map(this.toModel)
}
