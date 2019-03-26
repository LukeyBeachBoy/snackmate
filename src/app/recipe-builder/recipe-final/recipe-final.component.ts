/**
 * @file Logic for the final page of the recipe builder
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/definitions/user.model';

@Component({
  selector: 'app-recipe-final',
  templateUrl: './recipe-final.component.html',
  styleUrls: ['./recipe-final.component.scss']
})
export class RecipeFinalComponent implements OnInit {
  user: User;
  incompleteSubmit = false;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }
  onUpload(form: NgForm) {
    // this.recipeSvc.uploadRecipe(recipe, this.selectedFile);
    // this.loc.go('');
  }
  checkStatus(form: NgForm) {
    if (form.status === 'VALID') {
      this.incompleteSubmit = false;
    }
  }
}
