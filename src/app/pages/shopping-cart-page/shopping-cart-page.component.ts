import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/interfaces/shoppingCart.interface';
import { Ingredient } from 'src/app/interfaces/ingredient.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.css'],
})
export class ShoppingCartPageComponent implements OnInit {
  cartData: ShoppingCart[] = [];
  customIngredients: Ingredient[] = [];
  subTotal = 0;
  ingredientsTotal = 0;
  grandTotal = 0;
  showIngredients = false;

  constructor(
    private shoppingCart: ShoppingCartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.cartData = this.shoppingCart.getCart();
    this.customIngredients = this.shoppingCart.getCustomIngredients();
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subTotal = this.cartData.reduce(
      (sum, item) => sum + Number(item.price) * item.qty, 0
    );
    this.ingredientsTotal = this.customIngredients.reduce(
      (sum, ing) => sum + Number(ing.price), 0
    );
    this.grandTotal = this.subTotal + this.ingredientsTotal;
  }

  get allIngredients(): { tname: string; price: number }[] {
    return this.customIngredients.map(ing => ({ tname: ing.tname, price: ing.price }));
  }

  increaseQty(item: ShoppingCart) {
    this.shoppingCart.increaseQty(item);
    this.calculateTotals();
  }

  decreaseQty(item: ShoppingCart) {
    if (item.qty > 1) {
      this.shoppingCart.decreaseQty(item);
    } else {
      this.removeItem(item);
    }
    this.calculateTotals();
  }

  removeItem(item: ShoppingCart) {
    const index = this.cartData.indexOf(item);
    if (index > -1) {
      this.shoppingCart.removeItem(index);
      this.refreshCart();
    }
  }

  removeIngredient(index: number) {
    this.shoppingCart.removeIngredient(index);
    this.refreshCart();
  }

  clearAll() {
    this.shoppingCart.clearCart();
    this.refreshCart();
    this.toastService.show('Cart cleared', 'info');
  }

  pay() {
    if (this.cartData.length === 0 && this.customIngredients.length === 0) {
      this.toastService.show('Your cart is empty!', 'warning');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
