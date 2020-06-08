import { Product } from './product';

export interface OrderItem {
    product: Partial<Product>
    quantity: number
    totalPrice: number
}