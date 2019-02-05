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
