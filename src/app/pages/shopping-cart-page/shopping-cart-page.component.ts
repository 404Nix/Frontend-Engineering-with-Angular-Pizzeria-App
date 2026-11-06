import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/interfaces/shoppingCart.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.css'],
})
export class ShoppingCartPageComponent implements OnInit {
  cartData: ShoppingCart[] = [];
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
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.subTotal = this.cartData.reduce(
      (sum, item) => sum + item.price * item.qty, 0
    );
    this.ingredientsTotal = this.cartData.reduce((sum, item) => {
      return sum + item.customizations.reduce((s, ing) => s + ing.price, 0);
    }, 0);
    this.grandTotal = this.subTotal + this.ingredientsTotal;
  }

  get allIngredients(): { tname: string; price: number }[] {
    const allIngs: { tname: string; price: number }[] = [];
    this.cartData.forEach(item => {
      item.customizations.forEach(ing => {
        allIngs.push({ tname: ing.tname, price: ing.price });
      });
    });
    return allIngs;
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

  clearAll() {
    this.shoppingCart.clearCart();
    this.refreshCart();
    this.toastService.show('Cart cleared', 'info');
  }

  pay() {
    if (this.cartData.length === 0) {
      this.toastService.show('Your cart is empty!', 'warning');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
