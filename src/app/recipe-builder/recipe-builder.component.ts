/**
 * @file Manages all children of the recipe builder
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { BuilderService } from '../services/builder.service';
import { slider } from './route-animations'; // slider transformer stepper fader
import { AuthService } from '../services/auth.service';
import { User } from '../definitions/user.model';

@Component({
  selector: 'app-recipe-builder',
  templateUrl: './recipe-builder.component.html',
  styleUrls: ['./recipe-builder.component.scss'],
  animations: [slider]
})
export class RecipeBuilderComponent implements OnInit, OnDestroy {
  user: User;
  constructor(
    private builder: BuilderService,
    private auth: AuthService,
    private router: Router
  ) {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  ngOnInit() {
    // Create a new recipe object when navigate to recipe-builder
    this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        console.log('Not logged in!');
        this.router.navigate(['']);
      }
    });
    this.builder.newRecipe();
  }

  ngOnDestroy() {
    /**
     * Regardless of whether the recipe has been uploaded,
     *  destroy the current recipe when navigating away
     */

    this.builder.reset();
  }
}
