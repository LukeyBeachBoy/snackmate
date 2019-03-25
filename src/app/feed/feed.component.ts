/**
 * @file Logic for the main feed page
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../definitions/recipe.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  recipes: Observable<Recipe[]>;
  constructor(private recipeSvc: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeSvc.getRecipes().valueChanges();
  }
}
