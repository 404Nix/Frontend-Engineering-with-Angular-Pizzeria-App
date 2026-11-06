import { Injectable } from '@angular/core';
import { ShoppingCart } from '../interfaces/shoppingCart.interface';
import { Pizza } from '../interfaces/pizza.interface';
import { Ingredient } from '../interfaces/ingredient.interface';

const CART_KEY = 'pizzeria_cart';
const INGREDIENTS_KEY = 'pizzeria_custom_ingredients';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCart: ShoppingCart[] = [];
  customIngredients: Ingredient[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const storedCart = localStorage.getItem(CART_KEY);
    this.shoppingCart = storedCart ? JSON.parse(storedCart) : [];

    const storedIngredients = localStorage.getItem(INGREDIENTS_KEY);
    this.customIngredients = storedIngredients ? JSON.parse(storedIngredients) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(this.shoppingCart));
    localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(this.customIngredients));
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
        price: Number(pizza.price),
        image: pizza.image,
        qty: 1,
        customizations: customizations,
      });
    }
    this.saveToStorage();
  }

  addCustomIngredients(ingredients: Ingredient[]) {
    this.customIngredients.push(...ingredients);
    this.saveToStorage();
  }

  getCustomIngredients(): Ingredient[] {
    return this.customIngredients;
  }

  getCart(): ShoppingCart[] {
    return this.shoppingCart;
  }

  getCount(): number {
    return this.shoppingCart.reduce((sum, item) => sum + item.qty, 0);
  }

  removeItem(index: number) {
    this.shoppingCart.splice(index, 1);
    if (this.shoppingCart.length === 0) {
      this.customIngredients.length = 0;
    }
    this.saveToStorage();
  }

  removeIngredient(index: number) {
    this.customIngredients.splice(index, 1);
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
    this.customIngredients.length = 0;
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(INGREDIENTS_KEY);
  }
}
