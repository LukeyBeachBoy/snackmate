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

@Component({
  selector: 'app-reciplefullpage',
  templateUrl: './reciplefullpage.component.html',
  styleUrls: ['./reciplefullpage.component.scss']
})
export class ReciplefullpageComponent implements OnInit {

  constructor(public storage: AngularFireStorage, private auth: AuthService, private route: ActivatedRoute, private db: AngularFirestore ) { }

  ngOnInit() {
   const para = this.route.params;

    console.log(para.id);
  }

}
