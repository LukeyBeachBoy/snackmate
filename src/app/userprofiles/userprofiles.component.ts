/**
 * @file Logic for populating the fields of recipe cards
 * with data fetched from the database
 * @author Juned Hussain // jh815@kent.ac.uk
 */

import {ActivatedRoute} from "@angular/router";
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../definitions/recipe.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { User } from '../definitions/user.model';
import { firestore } from 'firebase/app';
import * as moment from 'moment';
import { of } from 'rxjs';

@Component({
  selector: 'app-userprofiles',
  templateUrl: './userprofiles.component.html',
  styleUrls: ['./userprofiles.component.scss']
})
export class UserprofilesComponent implements OnInit {

   userImageURL: string;
  user: User;
  constructor(public storage: AngularFireStorage, private auth: AuthService, private route: ActivatedRoute) {
	  this.route.params.subscribe(params => console.log(params));

  }
  
  ngOnInit() {
  }

}
