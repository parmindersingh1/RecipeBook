import { AuthService } from './auth';
import { Ingredient } from "../models/ingredient";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/rx';

@Injectable()
export class ShoppingListService {
  private ingredients : Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService) { }

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return  this.http
            .put('https://ionic2-recipebook-7520a.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token,
             this.ingredients)
            .map((response: any) => {
              return response.json();
            })
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
          .get('https://ionic2-recipebook-7520a.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
          .map((response: any) => {
            return response.json();
          })
          .do((ingredients: Ingredient[]) => {
            if(ingredients) {
              this.ingredients = ingredients;
            } else {
              this.ingredients = [];
            }
            
          });
  }
}
