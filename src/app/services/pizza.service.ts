import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from '../interfaces/pizza.interface';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  getPizzaList(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>('assets/sample-json/pizza.json');
  }
}
