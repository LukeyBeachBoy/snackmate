import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Recipe } from './recipe.model';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: AngularFirestoreCollection<Recipe> = null;
  userId: string;

  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.auth.user$.subscribe(user => {
      if (user) {
      }
    });
  }

  getRecipes(): AngularFirestoreCollection<Recipe> {
    if (!this.userId) {
      console.log('no user logged in');
    }
    this.recipes = this.db.collection(`recipes/`);
    console.log(this.recipes);
    return this.recipes;
  }

  createRecipe(recipe: Recipe) {
    recipe.userId = this.userId;
    this.recipes.add(recipe);
  }
}
