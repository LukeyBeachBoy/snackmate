/**
 * @file Manages the first page of the recipe builder
 * @author Luke Beach // lb580@kent.ac.uk
 */


import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NgForm, NgModel } from '@angular/forms';
import { Recipe } from '../../definitions/recipe.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/definitions/user.model';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-recipe-initial',
  templateUrl: './recipe-initial.component.html',
  styleUrls: ['./recipe-initial.component.scss']
})
export class RecipeInitialComponent implements OnInit {
  user: User;
  selectedFile: File = null;
  localUrl = '';
  incompleteSubmit = false;
  name;
  description;
  file;
  fileName;
  constructor(
    private router: Router,
    private auth: AuthService,
    private builder: BuilderService
  ) {}
  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
    if (!this.builder.isEmpty()) {
      const { name, description } = this.builder.getRecipe();
      const { image, url, fileName } = this.builder.getImage();
      this.description = description;
      this.name = name;
      // this.file = image;
      this.localUrl = url;
      $('.custom-file-label').attr('data-content', fileName);
      $('.custom-file-label').text(fileName);
    }
  }
  onImageSelect(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => (this.localUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);

      let fieldVal: string = $('#recipePic').val() as string;
      fieldVal = fieldVal.replace('C:\\fakepath\\', '');
      this.fileName = fieldVal;
      if (fieldVal !== undefined || fieldVal !== '') {
        $('.custom-file-label').attr('data-content', fieldVal);
        $('.custom-file-label').text(fieldVal);
      }
    }
  }
  checkStatus(form: NgForm) {
    if (form.status === 'VALID') {
      this.incompleteSubmit = false;
    }
  }
  onNext(form: NgForm) {
    if (form.invalid) {
      return (this.incompleteSubmit = true);
    }
    const recipe = new Recipe();
    recipe.description = this.description;
    recipe.name = this.name;
    recipe.userId = this.user.uid;
    this.builder.updateRecipe(recipe);
    this.builder.setImage(this.selectedFile, this.localUrl, this.fileName);
    this.router.navigate(['/new-recipe/step-2']);
  }
  onDeletePic(imageCtrl: NgModel) {
    imageCtrl.reset(); // Reset the form to empty so the user can choose another pic
    this.localUrl = ''; // Tell other elements that the url is empty so they can update
    $('#fileName').text('Choose File'); // Add the place holder back in
  }
}
