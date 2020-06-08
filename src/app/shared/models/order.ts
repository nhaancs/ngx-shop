import { ShoppingCart } from './shopping-cart'
import { Shipping } from './shipping'
import { OrderItem } from './order-item'

export class Order {
    key: string
    datePlaced: number
    userId: string
    shipping: Shipping
    private items: Map<number, OrderItem>

    get itemsArr(): OrderItem[] {
      let result: OrderItem[] = []
      this.items.forEach(item => result.push(item)) 
      return result
    }

    get total(): number {
      let result = 0
      this.items.forEach(item => result += item.totalPrice)
      return result
    }

    static fromResponse(data): Order {
      let model = new Order()
      Object.assign(model, data)
      model.items = new Map<number, OrderItem>()
      if (data.items) {
        for(let key in data.items) {
          model.items.set(Number(key), data.items[key])
        }
      }

      return model
    }

    static toRequest(
      userId: string, 
      shipping: any, 
      cart: ShoppingCart
    ): any {
        let model: any = {}
        model.datePlaced = new Date().getTime()
        model.userId = userId
        model.shipping = shipping
        model.items = cart.items.map(i => ({
            product: {
              title: i.title,
              imageUrl: i.imageUrl,
              price: i.price
            },
            quantity: i.quantity,
            totalPrice: i.totalPrice
          }) )
          
        return model
    }
}