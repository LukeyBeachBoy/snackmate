import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../definitions/recipe.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { User } from '../definitions/user.model';
import { firestore, auth } from 'firebase/app';
import * as moment from 'moment';
import { of } from 'rxjs';
import { defineBase } from '@angular/core/src/render3';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-reciplefullpage',
  templateUrl: './reciplefullpage.component.html',
  styleUrls: ['./reciplefullpage.component.scss']
})
export class ReciplefullpageComponent implements OnInit {

  @Input() recipe: Recipe;
  instructions = [];
  ingredients = [];
  recipeImageURL: string;
  userImageURL: string;
  user: User;
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
  test: number;

  constructor(public storage: AngularFireStorage, private auth: AuthService, private route: ActivatedRoute, private db: AngularFirestore ) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => id=params.id);
 console.log(id);
 this.db.collection('recipes', res => res.where('recipeId', '==', id))
.valueChanges().subscribe(<Recipe>(res)=>{
  this.recipe=res[0];
  this.instructions = res[0].instructions;
  this.ingredients = res[0].ingredients;


  this.storage
          .ref(`recipes/${this.recipe.recipeId}.jpg`)
          .getDownloadURL()
          .subscribe(recipeURL => {
            this.recipeImageURL = recipeURL;
          });

  var amount_carbs = this.recipe.nutrition.carbs;
     var amount_calories = this.recipe.nutrition.calories; 
     var amount_protein = this.recipe.nutrition.protein;
     var amount_fat = this.recipe.nutrition.fat;
console.log(amount_carbs);
     switch(true)
     {
      case (amount_calories<250):
      this.calories = 'badge-success';
      break;
      case (amount_calories<500):
      this.calories = 'badge-primary';
      break;
      case (amount_calories<1000):
      this.calories = 'badge-warning';
      break;
      case (amount_calories>=1000):
      this.calories = 'badge-danger';
      break;     
     }

     switch(true)
     {
       case(amount_carbs<50):
       this.carbs = 'badge-success';
       break;
       case(amount_carbs<100):
       this.carbs = 'badge-primary';
       break;
       case(amount_carbs<200):
       this.carbs = 'badge-warning';
       break;
       case(amount_carbs>=200):
       this.carbs = 'badge-danger';
       break;
     }

     switch(true)
     {
       case(amount_fat<50):
       this.fat = 'badge-success';
       break;
       case(amount_fat<100):
       this.fat = 'badge-primary';
       break;
       case(amount_fat<200):
       this.fat = 'badge-warning';
       break;
       case(amount_fat>=200):
       this.fat = 'badge-danger';
       break;
     }
    
     switch(true)
     {
       case(amount_protein<50):
       this.protein = 'badge-success';
       break;
       case(amount_protein<100):
       this.protein = 'badge-primary';
       break;
       case(amount_protein<200):
       this.protein = 'badge-warning';
       break;
       case(amount_protein>=200):
       this.protein = 'badge-danger';
       break;
     }
  
});


    


  
    
  }

}
