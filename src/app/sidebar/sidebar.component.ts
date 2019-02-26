/**
 * @file Logic for opening and closing the sidebar,
 * AS WELL AS resizing it when the browser's dimensions
 * change
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';
import { AuthService } from '../services/auth.service';
import { User } from '../definitions/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: Observable<User>;
  default = {
    displayName: 'Not logged in',
    photoURL: 'assets/user.png',
    uid: '',
    email: ''
  };
  sidebarOpen = false;
  constructor(
    private sidebar: SidebarService,
    public auth: AuthService,
    private $location: Location
  ) {}

  ngOnInit() {
    /* This is the function called each time the sidebar button is
     pressed */
    this.sidebar.getStatus().subscribe(() => {
      this.buttonToggle();
      // If mobile
      if (!this.sidebarOpen) {
        $('.sideMenu')
          .addClass('open')
          .removeClass('closed');
        this.sidebarOpen = true;
      } else {
        $('.sideMenu')
          .addClass('closed')
          .removeClass('open');
        this.sidebarOpen = false;
      }
    });
  }

  buttonToggle() {
    if (!this.sidebarOpen) {
      $('#sidebarBtn').css({
        transform: 'rotate(90deg)',
        transition: '0.4s'
      });
    } else {
      $('#sidebarBtn').css({ transform: 'rotate(0)' });
    }
  }

  onNav() {
    this.sidebar.toggleSideBar();
  }

  onLogout() {
    this.auth.signOut();
    this.$location.go('/');
    this.onNav();
  }

  onClose() {
    this.sidebar.toggleSideBar();
  }
}
