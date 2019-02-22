/**
 * @file Stores the definition for the Recipe object,
 * which is used to reference recipes as they are added
 * and retrieved from the database
 * @author Luke Beach // lb580@kent.ac.uk
 */

export class Recipe {
  allergens?: Array<string>;
  date?: Date | string;
  description?: string;
  imageURL?: string;
  ingredients?: Array<{
    measurement?: string;
    name?: string;
    quantity?: number;
  }>;
  instructions?: Array<string>;
  name?: string;
  nutrition?: {
    calories?: number;
    carbs?: number;
    fat?: number;
    protein?: number;
  };
  recipeId?: string;
  userId?: string;
}
