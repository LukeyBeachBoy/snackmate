/**
 * @file Small service used to manage the sidebar's
 * status
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../definitions/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnInit {
  user: User;
  private sidebarClicked = new Subject();
  constructor(private auth: AuthService) {}
  ngOnInit() {
    this.auth.user$.subscribe(u => {
      this.user = u;
    });
  }
  public toggleSideBar() {
    this.sidebarClicked.next();
  }
  getStatus(): Observable<{}> {
    return this.sidebarClicked.asObservable();
  }
}
