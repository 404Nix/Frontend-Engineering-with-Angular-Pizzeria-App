import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces/shoppingCart.interface';
import { Pizza } from '../interfaces/pizza.interface';
import { Ingredient } from '../interfaces/ingredient.interface';

const CART_KEY = 'pizzeria_cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCart: ShoppingCart[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(CART_KEY);
    this.shoppingCart = stored ? JSON.parse(stored) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(this.shoppingCart));
  }

  addToCart(pizza: Pizza, customizations: Ingredient[] = []) {
    const found = this.shoppingCart.find((i) => i.id === pizza.id);
    if (found) {
      found.qty++;
    } else {
      this.shoppingCart.push({
        id: pizza.id,
        type: pizza.type,
        name: pizza.name,
        price: pizza.price,
        image: pizza.image,
        qty: 1,
        customizations: customizations,
      });
    }
    this.saveToStorage();
  }

  getCart(): ShoppingCart[] {
    return this.shoppingCart;
  }

  getCount(): number {
    return this.shoppingCart.reduce((sum, item) => sum + item.qty, 0);
  }

  removeItem(index: number) {
    this.shoppingCart.splice(index, 1);
    this.saveToStorage();
  }

  increaseQty(item: ShoppingCart) {
    item.qty++;
    this.saveToStorage();
  }

  decreaseQty(item: ShoppingCart) {
    if (item.qty > 1) {
      item.qty--;
      this.saveToStorage();
    }
  }

  clearCart() {
    this.shoppingCart.length = 0;
    localStorage.removeItem(CART_KEY);
  }
}
