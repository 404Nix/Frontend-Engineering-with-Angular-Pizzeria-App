import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastComponent } from './components/toast/toast.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OrderPizzaPageComponent } from './pages/order-pizza-page/order-pizza-page.component';
import { BuildUrPizzaPageComponent } from './pages/build-ur-pizza-page/build-ur-pizza-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToastComponent,
    HomePageComponent,
    OrderPizzaPageComponent,
    BuildUrPizzaPageComponent,
    ShoppingCartPageComponent,
    CheckoutPageComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
