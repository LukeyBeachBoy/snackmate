import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sideBarOpen = false;
  username = 'Not logged in';
  constructor() {}

  ngOnInit() {}
  toggleSidebar() {
    if (!this.sideBarOpen) {
      $('#sideBar').css({ width: '250px' });
      $('#main').css({ 'margin-left': '250px' });
      $('#sidebarBtn').css({ transform: 'rotate(90deg)' });
      this.sideBarOpen = true;
    } else {
      $('#sideBar').css({ width: '0' });
      $('#main').css({ 'margin-left': '0' });
      $('#sidebarBtn').css({ transform: 'rotate(0)' });
      this.sideBarOpen = false;
    }
  }
}
