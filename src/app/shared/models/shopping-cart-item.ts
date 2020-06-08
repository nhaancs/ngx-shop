export class ShoppingCartItem {
    key: string
    title: string
    imageUrl: string
    price: number
    quantity: number

    get totalPrice(): number {
        return this.price * this.quantity
    }

    static fromResponse(data: Partial<ShoppingCartItem>): ShoppingCartItem {
        let model = new ShoppingCartItem()
        Object.assign(model, data)
        return model
    }

    static toRequest(data: Partial<ShoppingCartItem>): Partial<ShoppingCartItem> {
        let model: any = {}
        model.key = data.key
        model.title = data.title 
        model.imageUrl = data.imageUrl
        model.price = data.price
        model.quantity = data.quantity
        // Object.assign(model, data) is not appropriate 
        // because we only need some fields from product object
        // the caller: ShoppingCartItem.toRequest({...product, quantity: quantity})
        return model
    }
}