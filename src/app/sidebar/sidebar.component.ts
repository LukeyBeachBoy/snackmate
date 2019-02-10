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
    photoURL: '../../assets/user.png',
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
      if (this.sidebarOpen) {
        $('.sideMenu')
          .addClass('mobile')
          .removeClass('desktop');
      }
    } else {
      if (this.sidebarOpen) {
        $('.sideMenu')
          .addClass('desktop')
          .removeClass('mobile');
      }
    }
  }

  ngOnInit() {
    /* This is the function called each time the sidebar button is
     pressed */
    this.sidebar.getStatus().subscribe(() => {
      if (!this.sidebarOpen) {
        if ($('.mobile').css('float') === 'none') {
          $('#sideBar')
            .addClass('openMobile')
            .removeClass('close');
          // $('#sideBar').css({ width: '196px' });
        } else {
          // $('#sideBar').css({ width: '250px' });
          $('#sideBar')
            .addClass('open')
            .removeClass('close');
        }

        $('#sidebarBtn').css({
          transform: 'rotate(90deg)',
          transition: '0.4s'
        });
        this.sidebarOpen = true;
      } else {
        // $('#sideBar').css({ width: '0' });
        $('#sideBar')
          .addClass('close')
          .removeClass('open openMobile');
        $('#sidebarBtn').css({ transform: 'rotate(0)' });
        this.sidebarOpen = false;
      }
    });
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
