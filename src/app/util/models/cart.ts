import { Product } from './product';

export interface Cart {
  productId?: string;
  color: string;
  size: string;
  selectedQuantity: number;
  id?: string;
  price: number;
  productUrl?: string;
  product?: Product;
  total?: number;
  shipping?: number;
}
