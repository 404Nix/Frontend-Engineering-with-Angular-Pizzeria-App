export interface Pizza {
  id: string;
  type: string;
  price: number;
  name: string;
  image: string;
  description: string;
  ingredients: Array<string>;
  topping: Array<string>;
}
