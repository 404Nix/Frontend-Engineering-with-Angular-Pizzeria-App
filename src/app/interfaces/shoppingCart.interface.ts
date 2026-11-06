import { Ingredient } from './ingredient.interface';

export interface ShoppingCart {
  id: string;
  type: string;
  name: string;
  qty: number;
  price: number;
  image: string;
  customizations: Ingredient[];
}
