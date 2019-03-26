import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFirestore,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import {
  AngularFireStorageModule,
  AngularFireStorage
} from '@angular/fire/storage';
import { NgxPicaModule } from 'ngx-pica';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { FeedComponent } from './feed/feed.component';
import { RecipeBuilderComponent } from './recipe-builder/recipe-builder.component';
import { environment } from 'src/environments/environment';
import { RecipeDetailsComponent } from './recipe-builder/recipe-details/recipe-details.component';
import { RecipeInitialComponent } from './recipe-builder/recipe-initial/recipe-initial.component';
import { NutritionixService } from './services/nutritionix.service';
import { RecipeFinalComponent } from './recipe-builder/recipe-final/recipe-final.component';
import { UserprofilesComponent } from './userprofiles/userprofiles.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    RecipeCardComponent,
    FeedComponent,
    RecipeBuilderComponent,
    RecipeDetailsComponent,
    RecipeInitialComponent,
    RecipeFinalComponent,
    UserprofilesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxPicaModule
  ],
  providers: [
    NutritionixService,
    AngularFireStorage,
    AuthService,
    AngularFirestore,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
