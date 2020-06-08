export class Product {
    key: string
    title: string
    price: number
    category: string
    imageUrl: string

    /**
     * Construct a Product object by the response from Firebase
     */
    static fromResponse(data: Partial<Product>): Product {
        let model = new Product()
        Object.assign(model, data)

        return model
    }
}