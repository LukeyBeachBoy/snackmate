import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations'; // slider transformer stepper fader

@Component({
  selector: 'app-recipe-builder',
  templateUrl: './recipe-builder.component.html',
  styleUrls: ['./recipe-builder.component.scss'],
  animations: [slider]
})
export class RecipeBuilderComponent {
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
