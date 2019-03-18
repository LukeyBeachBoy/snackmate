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
import { NgxPicaService } from 'ngx-pica';
@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  newRecipe: Recipe;
  recipes: AngularFirestoreCollection<Recipe>;

  constructor(
    private pica: NgxPicaService,
    private db: AngularFirestore,
    private auth: AuthService,
    public storage: AngularFireStorage
  ) {
    this.recipes = db.collection<Recipe>('/recipes');
  }

  ngOnInit() {}

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

  upvoteRecipe(recipeID: string) {
    let likedRecipes: Array<string>;
    this.auth.user$.subscribe(user => {
      if (user !== null) {
        this.recipes
          .doc(`${recipeID}`)
          .get()
          .subscribe(recipe => {
            const likes = recipe.get('likes');
            if (user.likedRecipes) {
              likedRecipes = user.likedRecipes;
              if (likedRecipes.includes(recipeID)) {
                // If the user has liked this before, decrease the like count because they are now unliking it
                this.recipes.doc(`${recipeID}`).update({ likes: likes - 1 });
                const removed = likedRecipes.splice(
                  likedRecipes.indexOf(recipeID)
                );
                this.db.doc(`/users/${user.uid}`).set(
                  {
                    likedRecipes: removed
                  },
                  { merge: true }
                );
              } else {
                // If they haven't liked this recipe yet, then upvote it
                this.recipes.doc(`${recipeID}`).update({ likes: likes + 1 });
                likedRecipes.push(recipeID);
                this.db.doc(`/users/${user.uid}`).set({ likedRecipes });
              }
            } else {
              likedRecipes = [recipeID];
              this.recipes.doc(`${recipeID}`).update({ likes: likes + 1 });
              this.db.doc(`/users/${user.uid}`).set({ likedRecipes });
            }
          });
      } else {
        console.log('not logged in');
      }
    });
  }
}
