import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../services/recipe.model';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe;
  recipeURL: string;
  constructor(public storage: AngularFireStorage) {}

  ngOnInit() {
    console.log(this.recipe.recipeId);
    this.storage
      .ref('')
      .child(`recipes/${this.recipe.recipeId}.jpg`)
      .getDownloadURL()
      .subscribe(url => {
        this.recipeURL = url;
        console.log(this.recipeURL);
      });
  }
}
