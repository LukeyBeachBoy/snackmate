import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../definitions/recipe.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { User } from '../definitions/user.model';
import { firestore, auth } from 'firebase/app';
import * as moment from 'moment';
import { of } from 'rxjs';
import { defineBase } from '@angular/core/src/render3';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-reciplefullpage',
  templateUrl: './reciplefullpage.component.html',
  styleUrls: ['./reciplefullpage.component.scss']
})
export class ReciplefullpageComponent implements OnInit {

  @Input() recipe: Recipe;
  recipeImageURL: string;
  userImageURL: string;
  user: User;
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
  test: number;

  constructor(public storage: AngularFireStorage, private auth: AuthService, private route: ActivatedRoute, private db: AngularFirestore ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.auth.getUser(params.id).subscribe((user) => {
        this.user = user as User;
     
      const hee =  this.db.collection('recipes', res => res.where('recipeId', '==', params.id))
.snapshotChanges().subscribe(res=>{
  console.log(res);
 
  this.test = res.length;
  
 
});

      })
    );
   
  }

}
