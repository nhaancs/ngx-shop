import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    // data.items return from  is an object (a map) with keys are product ids
    private itemsMap: Map<string, ShoppingCartItem>
    dateCreated: number 

    getItem(productId: string):ShoppingCartItem {
        return this.itemsMap.get(productId)
    }

    getQuantity(product: Product) {
        let item = this.itemsMap.get(product.key)
        return item ? item.quantity : 0
    }

    get totalPrice(): number {
        let total = 0
        this.items.forEach(item => total += item.totalPrice)

        return total
    }

    get items(): ShoppingCartItem[] {
        let result: ShoppingCartItem[] = []
        this.itemsMap.forEach(item => result.push(item))

        return result
    }

    get totalItemsCount(): number {
        let count = 0
        this.itemsMap.forEach(item => count += item.quantity)

        return count
    }

    static fromResponse(data: any): ShoppingCart {
        let model = new ShoppingCart()

        model.itemsMap = new Map<string, ShoppingCartItem>()
        
        if (data.items) {
            // map each item to coresponding model
            for(let productId in data.items) {
                model.itemsMap.set(
                    productId, 
                    ShoppingCartItem.fromResponse(data.items[productId])
                )
            }
        }
        
        model.dateCreated = data.dateCreated || new Date().getTime()

        return model
    }
}