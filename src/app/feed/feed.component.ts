import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  recipes: Array<{}> = [
    // An array to store recipes fetched from API
    {
      name: 'American Burger',
      pic: '../../assets/foodPics/burger-cropped.jpg',
      author: 'Matt Davidson',
      authorPic: '../../assets/authorPics/talin.jpg',
      description: `A classic American
      style burger with roast chicken,
      onions, tomatoes and mayo.`,
      nutrition: {
        calories: 607,
        protein: 50,
        carbs: 44,
        fat: 20
      },
      uploaded: 'Just Now...',
      likes: 600,
      comments: '4k'
    },
    {
      name: 'Homemade Lasagne',
      pic: '../../assets/foodPics/Lasagne.jpg',
      author: 'Joseph Martinez',
      authorPic: '../../assets/authorPics/jeff.jpg',
      description: `Lasagne, or the singular lasagna, commonly
       refers to a culinary dish made with stacked layers of pasta
       alternated with sauces and ingredients such as meats, vegetables
       and cheese, and sometimes topped with melted grated cheese.
       The resulting lasagne casserole is cut into single-serving
       square portions.`,
      nutrition: {
        calories: 607,
        protein: 50,
        carbs: 44,
        fat: 20
      },
      uploaded: 'Just Now...',
      likes: 600,
      comments: '4k'
    },
    {
      name: 'Delicious Tofu',
      pic: '../../assets/foodPics/Tofu.jpg',
      author: 'Olive Williams',
      authorPic: '../../assets/authorPics/girl.jpg',
      description: `A classic American
      style burger with roast chicken,
      onions, tomatoes and mayo.`,
      nutrition: {
        calories: 607,
        protein: 50,
        carbs: 44,
        fat: 20
      },
      uploaded: 'Just Now...',
      likes: 600,
      comments: '4k'
    },
    {
      name: 'Breakfast Pizza',
      pic: '../../assets/foodPics/Pizza.jpg',
      author: 'Tom Stevens',
      authorPic: '../../assets/authorPics/coolguy.jpg',
      description: `A classic American
      style burger with roast chicken,
      onions, tomatoes and mayo.`,
      nutrition: {
        calories: 607,
        protein: 50,
        carbs: 44,
        fat: 20
      },
      uploaded: 'Just Now...',
      likes: 600,
      comments: '4k'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
