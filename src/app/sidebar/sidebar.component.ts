import { Component, OnInit, HostListener, Output, Input } from '@angular/core';
import * as $ from 'jquery';
import { Subject, Observable } from 'rxjs';
import { SidebarService } from '../sidebar.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() user = {
    username: 'Not logged in',
    profilePic: '',
    logged: false
  };
  sidebarOpen = false;

  constructor(private sidebar: SidebarService) {}

  @HostListener('window:resize', ['$event'])
  resizeMenu($event) {
    /**
     * Check the 'mobile' class to see if the screen size
     * is 160px
     */
    if ($('.mobile').css('float') === 'none') {
      if (this.sidebarOpen) {
        $('#sideBar').css({ width: '160px' });
      }
    } else {
      if (this.sidebarOpen) {
        $('#sideBar').css({ width: '250px' });
      }
    }
  }

  ngOnInit() {
    this.sidebar.getStatus().subscribe(() => {
      if (!this.sidebarOpen) {
        if ($('.mobile').css('float') === 'none') {
          $('#sideBar').css({ width: '160px' });
        } else {
          $('#sideBar').css({ width: '250px' });
        }

        $('#sidebarBtn').css({
          transform: 'rotate(90deg)',
          transition: '0.4s'
        });
        this.sidebarOpen = true;
      } else {
        $('#sideBar').css({ width: '0' });
        $('#sidebarBtn').css({ transform: 'rotate(0)' });
        this.sidebarOpen = false;
      }
    });
  }
  onClose($event) {
    event.preventDefault();
    this.sidebar.toggleSideBar();
  }
}
