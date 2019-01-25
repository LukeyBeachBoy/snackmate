import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sideBarOpen = false;
  profilePic = '';
  username = 'Not logged in';
  constructor() {}

  ngOnInit() {}
  @HostListener('window:resize', ['$event'])
  toggleSidebar($event) {
    if ($event) {
      if ($('#sideBar').css('width') === '160px') {
        $('#sideBar').css({ width: '250px' });
      } else {
        $('#sideBar').css({ width: '160px' });
      }
    } else {
      if (!this.sideBarOpen) {
        if ($('.mobile').css('float') === 'none') {
          $('#sideBar').css({ width: '160px' });
          $('#main').css({ 'margin-right': '160px' });
        } else {
          $('#sideBar').css({ width: '250px' });
          $('#main').css({ 'margin-right': '250px' });
        }

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
}
