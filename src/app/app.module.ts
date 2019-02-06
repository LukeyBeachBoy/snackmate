import { BrowserModule } from '@angular/platform-browser';
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

import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { FeedComponent } from './feed/feed.component';
import { RecipeBuilderComponent } from './recipe-builder/recipe-builder.component';
import { environment } from 'src/environments/environment';
import {
  AngularFireStorageModule,
  AngularFireStorage
} from '@angular/fire/storage';
import { NgxPicaModule } from 'ngx-pica';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    RecipeCardComponent,
    FeedComponent,
    RecipeBuilderComponent
  ],
  imports: [
    BrowserModule,
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
    AngularFireStorage,
    AuthService,
    AngularFirestore,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
