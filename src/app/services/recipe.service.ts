import { Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  recipes: AngularFirestoreCollection<Recipe> = null;
  user: User;

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    public storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  getRecipes(): AngularFirestoreCollection<Recipe> {
    this.recipes = this.db.collection(`recipes/`);
    return this.recipes;
  }

  createRecipe(recipe: Recipe) {
    recipe.userId = this.user.uid;
    this.recipes.add(recipe);
  }
}
