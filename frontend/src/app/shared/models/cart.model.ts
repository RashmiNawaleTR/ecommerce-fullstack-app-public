import { Product } from './product.model';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  itemTotal: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
}

export interface CartItemRequest {
  productId: number;
  quantity: number;
}
