/**
 * @file Logic for the second page of the recipe builder
 * @author Luke Beach // lb580@kent.ac.uk
 */
import * as shortid from 'shortid';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NutritionixService } from '../../services/nutritionix.service';
import { FoodData } from '../../definitions/nutritionData';
import { Recipe } from 'src/app/definitions/recipe.model';
import { BuilderService } from 'src/app/services/builder.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  @ViewChild('form') ingredientForm: NgForm;
  totalNutrition = {
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0
  };
  input;
  amount;
  incompleteSubmit = false;
  ingredients = [];
  constructor(
    private router: Router,
    private recipeSvc: RecipeService,
    private nutritionix: NutritionixService,
    private builder: BuilderService
  ) {}

  ngOnInit() {}
  isValid(form: NgForm) {
    if (form.status === 'VALID') {
      this.incompleteSubmit = false;
    } else {
      this.incompleteSubmit = true;
    }
  }
  addIngredient(ingredient: { name: string; amount: string }) {
    /* ADD PLAIN STRING INGREDIENT TO LIST */
    this.input = ''; // Clear input fields
    this.amount = '';
    document.getElementById('ingredient').focus(); // Reset user cursor
    if (
      ingredient.name === '' ||
      ingredient.name === undefined ||
      ingredient.amount === '' ||
      ingredient.amount === undefined
    ) {
      this.incompleteSubmit = true;
      return; // If they try to submit an empty ingredient
    } else {
      const id = shortid.generate(); /* Creating a UID for each recipe so that we
      can access them easier later, since we don't know their array index yet
      because they haven't been added */
      this.ingredients.push({
        amount: ingredient.amount,
        name: ingredient.name,
        id
      });

      /* GET NUTRITIONAL INFORMATION FOR THE INGREDIENT */

      this.nutritionix
        .getParsedRecipe(`${ingredient.name}, ${ingredient.amount}`)
        .subscribe(res => {
          const {
            nf_calories,
            nf_protein,
            nf_total_carbohydrate,
            nf_total_fat
          } = res.foods[0];
          // Only take the properties we need
          const nutrition: FoodData = {
            cals: Math.round(nf_calories),
            protein: Math.round(nf_protein),
            carbs: Math.round(nf_total_carbohydrate),
            fat: Math.round(nf_total_fat)
          };
          /* Using that id
              from earlier to add the nutritional info to the ingredient.
              This is necessary because when we remove an ingredient from the list
              we also need to remove the nutritional info so that the
              calories etc are accurate.
          */
          const newIng = this.ingredients.find(function(newIngredient) {
            if (newIngredient.id === id) {
              return newIngredient;
            }
          });
          newIng.nutrition = nutrition; // Add nutrition to the ingredient
          this.totalNutrition.calories += nutrition.cals;
          this.totalNutrition.carbs += nutrition.carbs;
          this.totalNutrition.protein += nutrition.protein;
          this.totalNutrition.fat += nutrition.fat;
        });
    }
  }
  removeIngredient(id, ingredientElement) {
    $(`#${ingredientElement}`).fadeOut();
    setTimeout(() => {
      const oldNutritionalData = this.ingredients.find(function(ing) {
        if (ing.id === id) {
          return ing;
        }
      });
      const index = this.ingredients.findIndex(
        delIngredient => delIngredient.id === id
      );
      this.totalNutrition.calories -= oldNutritionalData.nutrition.cals;
      this.totalNutrition.carbs -= oldNutritionalData.nutrition.carbs;
      this.totalNutrition.protein -= oldNutritionalData.nutrition.protein;
      this.totalNutrition.fat -= oldNutritionalData.nutrition.fat;
      this.ingredients.splice(index, 1);
    }, 600);
  }

  onSubmit() {
    if (this.ingredients.length === 0 && this.incompleteSubmit === true) {
      return;
    } else {
      const currentRecipe: Recipe = this.builder.getRecipe();
      currentRecipe.nutrition = this.totalNutrition;
      this.builder.updateRecipe(currentRecipe);
      this.recipeSvc.uploadRecipe(
        this.builder.getRecipe(),
        this.builder.getImage().image
      );
      setTimeout(() => {
        this.router.navigate(['']);
      }, 2000);
    }
  }
}
