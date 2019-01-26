import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sideBarOpen = false;
  profilePic = '';
  username = 'Not logged in';
  constructor(private sidebar: SidebarService) {}

  ngOnInit() {}

  toggleSidebar() {
    this.sidebar.toggleSideBar();
  }
}