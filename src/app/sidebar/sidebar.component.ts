import { Component, OnInit, HostListener, Output } from '@angular/core';
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
  sidebarOpen = false;
  profilePic = '';
  username = 'Not logged in';
  constructor(private sidebar: SidebarService) {}

  @HostListener('window:resize', ['$event'])
  resizeMenu($event) {
    if ($event) {
      if ($('.mobile').css('float') === 'none') {
        $('#sideBar').css({ width: '160px' });
      } else {
        $('#sideBar').css({ width: '250px' });
      }
    }
  }

  ngOnInit() {
    this.sidebar.getStatus().subscribe(() => {
      if (!this.sidebarOpen) {
        if ($('.mobile').css('float') === 'none') {
          $('#sideBar').css({ width: '160px' });
          $('#main').css({ 'margin-right': '160px' });
        } else {
          $('#sideBar').css({ width: '250px' });
          $('#main').css({ 'margin-right': '250px' });
        }

        $('#sidebarBtn').css({
          transform: 'rotate(90deg)',
          transition: '0.4s'
        });
        this.sidebarOpen = true;
      } else {
        $('#sideBar').css({ width: '0' });
        $('#main').css({ 'margin-left': '0' });
        $('#sidebarBtn').css({ transform: 'rotate(0)' });
        this.sidebarOpen = false;
      }
    });
  }

  onClose() {
    this.sidebar.toggleSideBar();
  }
}
