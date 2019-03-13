/**
 * @file Logic for the final page of the recipe builder
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-final',
  templateUrl: './recipe-final.component.html',
  styleUrls: ['./recipe-final.component.scss']
})
export class RecipeFinalComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onUpload(form: NgForm) {
    // this.recipeSvc.uploadRecipe(recipe, this.selectedFile);
    // this.loc.go('');
  }
}
