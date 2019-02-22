/**
 * @file Stores the definition for the FoodData interface,
 * which is used to pull necessary data off of api
 * results
 * @author Luke Beach // lb580@kent.ac.uk
 */
export interface FoodData {
  food_name?: string;
  cals?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  photo?: {
    highres?: string;
  };
}
