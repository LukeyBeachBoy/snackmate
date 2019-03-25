/**
 * @file Router to manage the different routes in
 * the app
 * @author Luke Beach // lb580@kent.ac.uk
 * @author Juned Hussain // jh815@kent.ac.uk
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { RecipeBuilderComponent } from './recipe-builder/recipe-builder.component';
import { RecipeDetailsComponent } from './recipe-builder/recipe-details/recipe-details.component';
import { RecipeInitialComponent } from './recipe-builder/recipe-initial/recipe-initial.component';
import { UserprofilesComponent } from './userprofiles/userprofiles.component';

const routes: Routes = [
  { path: '', component: FeedComponent },
  {
    path: 'new-recipe',
    component: RecipeBuilderComponent,
    children: [
      {
        path: '',
        component: RecipeInitialComponent,
        data: { animation: 'isLeft' }
      },
      {
        path: 'step-2',
        component: RecipeDetailsComponent,
        data: { animation: 'isRight' }
      }
    ]
  },
   { path: 'user/:id', component: UserprofilesComponent },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
