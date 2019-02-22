/**
 * @file A service that connects to the Nutritionix API
 * in order to parse natural language inputted by the
 * user and return nutritional information
 *
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NutritionixService {
  appID = '861a7f2e';
  appKey = 'ae4fbd8b8305137d0b3851b38100356e';
  headers;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'x-app-id': this.appID,
      'x-app-key': this.appKey,
      'x-remote-user-id': '0'
    });
  }
  public getParsedRecipe(recipeString) {
    return this.http.post<any>(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      { query: recipeString },
      { headers: this.headers }
    );
  }
}
