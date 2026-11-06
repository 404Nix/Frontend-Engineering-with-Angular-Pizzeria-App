import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { BuildUrPizzaPageComponent } from './pages/build-ur-pizza-page/build-ur-pizza-page.component';
import { OrderPizzaPageComponent } from './pages/order-pizza-page/order-pizza-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Pizzeria - Home'
  },
  {
    path: 'order-pizza',
    component: OrderPizzaPageComponent,
    title: 'Pizzeria - Order pizza'
  },
  {
    path: 'build-ur-pizza',
    component: BuildUrPizzaPageComponent,
    title: 'Pizzeria - Custom pizza'
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartPageComponent,
    title: 'Pizzeria - Cart'
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    title: 'Pizzeria - Checkout'
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Pizzeria - 404 - Not Found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
