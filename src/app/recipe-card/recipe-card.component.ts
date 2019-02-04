import { Component, OnInit, Input } from '@angular/core';
import { Ellipsis } from 'ftellipsis';
import * as $ from 'jquery';
import { Recipe } from '../services/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() {}

  ngOnInit() {
    const description = $('.description')[0];
    const ellipsis = new Ellipsis(description);
    ellipsis.calc();
    ellipsis.set();
  }
}
