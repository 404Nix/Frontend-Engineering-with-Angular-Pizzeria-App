import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/interfaces/shoppingCart.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  cartData: ShoppingCart[] = [];
  subTotal = 0;
  ingredientsTotal = 0;
  grandTotal = 0;

  name = '';
  phone = '';
  address = '';
  submitted = false;

  constructor(
    private cartService: ShoppingCartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartData = this.cartService.getCart();
    this.calculateTotals();

    if (this.cartData.length === 0) {
      this.toastService.show('Your cart is empty!', 'warning');
      this.router.navigate(['/order-pizza']);
    }
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

  get isFormValid(): boolean {
    return this.name.trim().length > 0
      && this.phone.trim().length === 10
      && this.address.trim().length > 0;
  }

  placeOrder(): void {
    this.submitted = true;
    if (!this.isFormValid) {
      return;
    }

    this.cartService.clearCart();
    this.toastService.show('Order placed successfully! 🍕', 'success');
    this.router.navigate(['/home']);
  }
}

