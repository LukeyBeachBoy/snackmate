import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
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

  @HostListener('window:resize', ['$event'])
  resizeMenu() {
    /**
     * Check the 'mobile' class to see if the screen size
     * and resize the sidebar if the client is on mobile/desktop
     */
    if ($('.mobile').css('float') === 'none') {
      // Resize for mobile
      $('#sideBar').css({ width: '196px' });
    } else {
      $('#sideBar').css({ width: '250px' });
    }
  }

  ngOnInit() {
    /* This is the function called each time the sidebar button is
     pressed */
    this.sidebar.getStatus().subscribe(() => {
      this.buttonToggle();
      // If mobile
      if ($('.mobile').css('float') === 'none') {
        if (!this.sidebarOpen) {
          $('#sideBar')
            .addClass('openMobile')
            .removeClass('closedMobile')
            .removeClass('open')
            .removeClass('closed');
          this.sidebarOpen = true;
        } else {
          $('#sideBar')
            .addClass('closedMobile')
            .removeClass('openedMobile')
            .removeClass('open')
            .removeClass('closed');
          this.sidebarOpen = false;
        }
      } else {
        if (!this.sidebarOpen) {
          $('#sideBar')
            .addClass('opened')
            .removeClass('closed')
            .removeClass('closedMobile')
            .removeClass('openMobile');
          this.sidebarOpen = true;
        } else {
          $('#sideBar')
            .addClass('closed')
            .removeClass('opened')
            .removeClass('closedMobile')
            .removeClass('openMobile');
          this.sidebarOpen = false;
        }
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

  onClose($event) {
    event.preventDefault();
    this.sidebar.toggleSideBar();
  }
}
