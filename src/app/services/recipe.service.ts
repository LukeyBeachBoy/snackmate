import { Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { NgxPicaService } from 'ngx-pica';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  recipes: AngularFirestoreCollection<Recipe>;
  user: User;

  constructor(
    private pica: NgxPicaService,
    private db: AngularFirestore,
    private auth: AuthService,
    public storage: AngularFireStorage
  ) {
    this.recipes = db.collection<Recipe>('/recipes');
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  getRecipes(): AngularFirestoreCollection<Recipe> {
    this.recipes = this.db.collection(`recipes/`);
    return this.recipes;
  }

  createRecipe(recipe: Recipe, image: File) {
    recipe.date = new Date();
    const originalImage: File = image;
    if (image) {
      this.pica.compressImage(image, 0.4).subscribe(resizedImage => {
        this.recipes.add(recipe).then(doc => {
          doc.update({ recipeId: doc.id }).then(updatedDate => {});
          this.storage.upload(`/recipes/${doc.id}.jpg`, originalImage);
          this.storage.upload(`/recipes/thumbs/${doc.id}.jpg`, resizedImage);
        });
      });
    }
  }
}
