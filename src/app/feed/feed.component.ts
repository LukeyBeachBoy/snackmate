import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RecipeService } from '../services/recipe.service';
import { AngularFireList } from '@angular/fire/database';
import { Recipe } from '../services/recipe.model';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  recipes: Recipe[];
  constructor(public recipeSvc: RecipeService) {}

  ngOnInit() {
    console.log('test');
    this.recipeSvc
      .getRecipes()
      .valueChanges()
      .subscribe(recipes => {
        this.recipes = recipes;
      });
  }
}
