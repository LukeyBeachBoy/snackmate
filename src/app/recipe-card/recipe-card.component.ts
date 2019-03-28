/**
 * @file Logic for populating the fields of recipe cards
 * with data fetched from the database
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../definitions/recipe.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';
import { User } from '../definitions/user.model';
import { firestore } from 'firebase/app';
import * as moment from 'moment';
import * as $ from 'jquery';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  recipeImageURL: string;
  userImageURL: string;
  user: User;
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
  constructor(
    public storage: AngularFireStorage,
    private auth: AuthService,
    private RecipeSvc: RecipeService
  ) {}

  ngOnInit() {
    $('.recipeCard').css('opacity', 0);
    if (this.recipe.date) {
      /* Cheeky way to get the date uploaded from firestore (don't trust the users)
       then parse it as a timestamp, then convert it to a text equivalent */
      const timestamp: firestore.Timestamp = new firestore.Timestamp(
        ((this.recipe.date as unknown) as firestore.Timestamp).seconds,
        ((this.recipe.date as unknown) as firestore.Timestamp).nanoseconds
      );
      this.recipe.date = moment(timestamp.toDate()).fromNow();
    }

    let amount_carbs = this.recipe.nutrition.carbs;
    let amount_calories = this.recipe.nutrition.calories;
    let amount_protein = this.recipe.nutrition.protein;
    let amount_fat = this.recipe.nutrition.fat;

    switch (true) {
      case amount_calories < 250:
        this.calories = 'badge-success';
        break;
      case amount_calories < 500:
        this.calories = 'badge-primary';
        break;
      case amount_calories < 1000:
        this.calories = 'badge-warning';
        break;
      case amount_calories >= 1000:
        this.calories = 'badge-danger';
        break;
    }

    switch (true) {
      case amount_carbs < 50:
        this.carbs = 'badge-success';
        break;
      case amount_carbs < 100:
        this.carbs = 'badge-primary';
        break;
      case amount_carbs < 200:
        this.carbs = 'badge-warning';
        break;
      case amount_carbs >= 200:
        this.carbs = 'badge-danger';
        break;
    }

    switch (true) {
      case amount_fat < 50:
        this.fat = 'badge-success';
        break;
      case amount_fat < 100:
        this.carbs = 'badge-primary';
        break;
      case amount_fat < 200:
        this.fat = 'badge-warning';
        break;
      case amount_fat >= 200:
        this.fat = 'badge-danger';
        break;
    }

    switch (true) {
      case amount_protein < 50:
        this.protein = 'badge-success';
        break;
      case amount_protein < 100:
        this.protein = 'badge-primary';
        break;
      case amount_protein < 200:
        this.protein = 'badge-warning';
        break;
      case amount_protein >= 200:
        this.protein = 'badge-danger';
        break;
    }

    if (this.recipe.userId) {
      this.auth.getUser(this.recipe.userId).subscribe((user: User) => {
        this.user = user as User;
        if (this.user.customPhoto) {
          this.storage
            .ref(`users/${user.uid}.jpg`)
            .getDownloadURL()
            .toPromise()
            .then(userUrl => {
              this.userImageURL = userUrl;
            });
        } else {
          this.userImageURL = user.photoURL;
        }
        this.storage
          .ref(`recipes/${this.recipe.recipeId}.jpg`)
          .getDownloadURL()
          .subscribe(recipeURL => {
            this.recipeImageURL = recipeURL;
          });
      });
    }
  }
  display() {
    $('.recipeCard').css('opacity', 100);
  }
  // onLike() {
  //   event.preventDefault();
  //   this.RecipeSvc.upvoteRecipe(this.recipe.recipeId);
  // }
}
