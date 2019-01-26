import { Component, OnInit, Input } from '@angular/core';
import { Ellipsis } from 'ftellipsis';
import * as $ from 'jquery';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: {
    name: string;
    pic: string;
    author: string;
    authorPic: string;
    description: string;
    nutrition: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    uploaded: string;
    likes: number;
    comments: string;
  };

  constructor() {}

  ngOnInit() {
    const description = $('.description')[0];
    const ellipsis = new Ellipsis(description);
    ellipsis.calc();
    ellipsis.set();
  }
}
