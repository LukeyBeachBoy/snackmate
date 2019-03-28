/**
 * @file Logic for the final page of the recipe builder
 * @author Luke Beach // lb580@kent.ac.uk
 */
declare var require: any;

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
const array_move = require('array-move');
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/definitions/user.model';
import { BuilderService } from 'src/app/services/builder.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-final',
  templateUrl: './recipe-final.component.html',
  styleUrls: ['./recipe-final.component.scss']
})
export class RecipeFinalComponent implements OnInit {
  instructions = [];
  user: User;
  input = '';
  incompleteSubmit = false;
  count = 0;
  constructor(
    private auth: AuthService,
    private builder: BuilderService,
    private recipeSvc: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }
  newInstruction() {
    if (this.input !== '') {
      this.count++;
      this.instructions.push(this.input);
      this.input = '';
    } else {
    }
  }
  removeInstruction(instructionIndex) {
    this.instructions.splice(instructionIndex, 1);
  }
  moveUp(instructionIndex) {
    this.instructions = array_move(
      this.instructions,
      instructionIndex,
      instructionIndex - 1
    );
  }
  moveDown(instructionIndex) {
    this.instructions = array_move(
      this.instructions,
      instructionIndex,
      instructionIndex + 1
    );
  }
  onUpload() {
    const currentRecipe = this.builder.getRecipe();
    currentRecipe.instructions = this.instructions;
    this.builder.updateRecipe(currentRecipe);
    this.recipeSvc.uploadRecipe(currentRecipe, this.builder.getImage().image);
    setTimeout(() => {
      this.router.navigate(['']);
    }, 2500);
  }
  checkStatus(form: NgForm) {
    if (form.status === 'VALID') {
      this.incompleteSubmit = false;
    }
  }
}
