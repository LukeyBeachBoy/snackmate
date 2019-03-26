/**
 * @file A shared service used to cache the data from each
 * page of the recipe builder and ultimately return a
 * full recipe ready to be uploaded.
 *
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Injectable } from '@angular/core';
import { Recipe } from '../definitions/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {
  localImage: File;
  url: string;
  fileName: string;
  recipe: Recipe;
  constructor() {}

  /**
   * @description Create a new, empty recipe object. This will be the global
   * reference to the recipe as it is procedurally created through the various pages
   * on the recipe builder page.
   */
  newRecipe() {
    this.recipe = new Recipe();
    return this.recipe;
  }
  /**
   * @description Takes a recipe object and checks for present values. Any values
   * that are different to the current recipe values will overwrite the current value
   */
  updateRecipe(recipe: Recipe): Recipe {
    this.recipe = { ...recipe };
    return this.recipe;
  }

  getRecipe() {
    return this.recipe;
  }

  isEmpty(): Boolean {
    let empty: Boolean;

    const fields = Object.entries(this.recipe);
    if (fields.length !== 0) {
      empty = false;
    } else {
      empty = true;
    }
    return empty;
  }

  setImage(image: File, url: string, fileName: string) {
    this.localImage = image;
    this.url = url;
    this.fileName = fileName;
  }

  getImage() {
    return {
      image: this.localImage,
      url: this.url,
      fileName: this.fileName
    };
  }

  /**
   * @description Clear the reference to the current recipe if any. This
   * will be called every time the user navigates away from the recipe builder
   */
  reset() {}
}
