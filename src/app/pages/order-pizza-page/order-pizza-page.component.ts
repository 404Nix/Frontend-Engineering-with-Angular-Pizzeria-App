import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { Pizza } from 'src/app/interfaces/pizza.interface';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-order-pizza-page',
  templateUrl: './order-pizza-page.component.html',
  styleUrls: ['./order-pizza-page.component.css'],
})
export class OrderPizzaPageComponent implements OnInit {
  pizzaData$!: Observable<Pizza[]>;
  addedPizzaId: string | null = null;

  constructor(private pizzaService: PizzaService, private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.pizzaData$ = this.pizzaService.getPizzaList();
  }

  addToCart(pizza: Pizza) {
    this.cartService.addToCart(pizza);
    this.addedPizzaId = pizza.id;
    setTimeout(() => {
      this.addedPizzaId = null;
    }, 2000);
  }
}
