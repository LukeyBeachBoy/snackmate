/**
 * @file Main recipe service responsible for connecting to
 * firestore and fetching, updating, creating and deleting
 * recipes
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../definitions/recipe.model';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '../definitions/user.model';
import { NgxPicaService } from 'ngx-pica';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  newRecipe: Recipe;
  recipes: AngularFirestoreCollection<Recipe>;
  user: User;

  constructor(
    private pica: NgxPicaService,
    private db: AngularFirestore,
    private auth: AuthService,
    public storage: AngularFireStorage
  ) {
    this.recipes = db.collection<Recipe>('/recipes');
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  /**
   * @description Returns a list of all recipes in date order
   */
  getRecipes(): AngularFirestoreCollection<Recipe> {
    this.recipes = this.db.collection(`recipes/`, recipe =>
      recipe.orderBy('date', 'desc')
    );
    return this.recipes;
  }

  uploadRecipe(recipe: Recipe, image: File) {
    recipe.date = new Date();
    const originalImage: File = image;
    if (image) {
      this.pica.compressImage(image, 0.4).subscribe(resizedImage => {
        this.recipes.add(recipe).then(doc => {
          doc.update({ recipeId: doc.id }).then(updatedDate => {});
          this.storage.upload(`/recipes/${doc.id}.jpg`, originalImage);
          this.storage.upload(`/recipes/thumbs/${doc.id}.jpg`, resizedImage);
        });
      });
    }
  }
}
