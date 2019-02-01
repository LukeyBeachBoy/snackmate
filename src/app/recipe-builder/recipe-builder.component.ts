import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-builder',
  templateUrl: './recipe-builder.component.html',
  styleUrls: ['./recipe-builder.component.scss']
})
export class RecipeBuilderComponent implements OnInit {
  onImageSelect(event) {
    event.preventDefault();
    console.log(event);
  }
  constructor() {}

  ngOnInit() {}
}
