import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-builder',
  templateUrl: './recipe-builder.component.html',
  styleUrls: ['./recipe-builder.component.scss']
})
export class RecipeBuilderComponent {
  selectedFile: File = null;
  constructor(private http: HttpClient) {}

  onImageSelect(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/test', fd).subscribe(res => {
      console.log(res);
    });
  }
}
