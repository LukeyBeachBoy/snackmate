/**
 * @file Small service used to manage the sidebar's
 * status
 * @author Luke Beach // lb580@kent.ac.uk
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarClicked = new Subject();
  constructor() {}
  public toggleSideBar() {
    this.sidebarClicked.next();
  }
  getStatus(): Observable<{}> {
    return this.sidebarClicked.asObservable();
  }
}
