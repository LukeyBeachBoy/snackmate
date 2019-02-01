import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Url } from 'url';

@Component({
  selector: 'app-recipe-builder',
  templateUrl: './recipe-builder.component.html',
  styleUrls: ['./recipe-builder.component.scss']
})
export class RecipeBuilderComponent implements OnInit {
  selectedFile: File = null;
  localUrl: string;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    $('.custom-file-label').css('font-size', '1.15em');
  }
  onImageSelect(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = e => (this.localUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);

      let fieldVal: string = $('#recipePic').val() as string;
      fieldVal = fieldVal.replace('C:\\fakepath\\', '');
      if (fieldVal !== undefined || fieldVal !== '') {
        $('.custom-file-label').attr('data-content', fieldVal);

        $('.custom-file-label').text(fieldVal);
      }
    }
  }
  onUpload() {
    const fd = new FormData();
    fd.append('name', $('#name').val() as string);
    fd.append('description', $('#description').val() as string);
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/test', fd).subscribe(res => {
      console.log(res);
    });
  }
}
