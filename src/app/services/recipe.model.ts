export class Recipe {
  allergens: Array<string>;
  date: Date | string;
  description: string;
  imageURL: string;
  ingredients: Array<{
    measurement: string;
    name: string;
    quantity: number;
  }>;
  instructions: Array<string>;
  name: string;
  nutrition: {
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
  };
  recipeId?: string;
  userId?: string;
}
