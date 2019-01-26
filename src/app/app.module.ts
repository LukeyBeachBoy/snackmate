import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { FeedComponent } from './feed/feed.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent, RecipeCardComponent, FeedComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
