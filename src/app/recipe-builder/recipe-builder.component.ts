import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { NgForm, NgModel } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../services/recipe.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recipe-builder',
  templateUrl: './recipe-builder.component.html',
  styleUrls: ['./recipe-builder.component.scss']
})
export class RecipeBuilderComponent implements OnInit {
  selectedFile: File = null;
  localUrl = '';
  incompleteSubmit = false;
  constructor(
    private http: HttpClient,
    private recipeSvc: RecipeService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    $('.custom-file-label').css('font-size', '1.15em');
  }
  onImageSelect(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => (this.localUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);

      let fieldVal: string = $('#recipePic').val() as string;
      fieldVal = fieldVal.replace('C:\\fakepath\\', '');
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
  onUpload(form: NgForm) {
    if (form.invalid) {
      return (this.incompleteSubmit = true);
    }
    const recipe: Recipe = {
      allergens: [],
      date: null,
      description: form.value.description,
      imageURL: '',
      ingredients: [],
      instructions: [],
      name: form.value.name,
      nutrition: {
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0
      }
    };
    this.auth.user$.subscribe(
      user => {
        if (user) {
          recipe.userId = user.uid;
          this.recipeSvc.createRecipe(recipe, this.selectedFile);
        }
      },
      err => {}
    );
  }
  onDeletePic(imageCtrl: NgModel) {
    imageCtrl.reset(); // Reset the form to empty so the user can choose another pic
    this.localUrl = ''; // Tell other elements that the url is empty so they can update
    $('#fileName').text('Choose File'); // Add the place holder back in
  }
}
