import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 2),
    new Ingredient('Bananas', 15),
    new Ingredient('Oranges', 6),
  ];


  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
