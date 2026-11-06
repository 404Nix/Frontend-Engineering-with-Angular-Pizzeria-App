import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/interfaces/ingredient.interface';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-build-ur-pizza-page',
  templateUrl: './build-ur-pizza-page.component.html',
  styleUrls: ['./build-ur-pizza-page.component.css'],
})
export class BuildUrPizzaPageComponent implements OnInit {
  ingredientsData$!: Observable<Ingredient[]>;
  selectedIngredients: Ingredient[] = [];
  totalCost = 0;
  buildAttempted = false;

  constructor(
    private ingredientsService: IngredientService,
    private cartService: ShoppingCartService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.ingredientsData$ = this.ingredientsService.getIngredientsList();
  }

  toggleIngredient(ingredient: Ingredient, checked: boolean) {
    if (checked) {
      this.selectedIngredients.push(ingredient);
    } else {
      this.selectedIngredients = this.selectedIngredients.filter(
        i => i.tname !== ingredient.tname
      );
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalCost = this.selectedIngredients.reduce(
      (sum, ing) => sum + ing.price,
      0
    );
  }

  get hasSelections(): boolean {
    return this.selectedIngredients.length > 0;
  }

  get hasPizzaInCart(): boolean {
    return this.cartService.getCart().length > 0;
  }

  buildPizza() {
    this.buildAttempted = true;

    if (!this.hasPizzaInCart) {
      this.toastService.show('Please add a pizza to your cart before selecting custom ingredients!', 'warning');
      return;
    }

    if (!this.hasSelections) {
      return;
    }

    this.cartService.addCustomIngredients(this.selectedIngredients);

    this.selectedIngredients = [];
    this.totalCost = 0;
    this.buildAttempted = false;
    this.toastService.show('Custom ingredients added to pizza order!', 'success');
  }
}
