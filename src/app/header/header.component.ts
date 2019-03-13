/**
 * @file Logic for the main navbar
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { SidebarService } from '../services/sidebar.service';

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
