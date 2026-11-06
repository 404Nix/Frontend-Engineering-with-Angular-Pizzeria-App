import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../interfaces/ingredient.interface';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private http: HttpClient) {}

  getIngredientsList(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>('assets/sample-json/ingredients.json');
  }
}
