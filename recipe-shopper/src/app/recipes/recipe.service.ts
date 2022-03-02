import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test', 'This is only a test', 'https://picsum.photos/200'),
    new Recipe('Testy McTestFace', 'Testing', 'https://picsum.photos/200'),
  ];

  constructor() { }

  getRecipes() {
    return [...this.recipes];
  }
  
}