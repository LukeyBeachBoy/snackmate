import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Snackmate';
  sidebarOpen = false;

  constructor(private sidebar: SidebarService) {}

  ngOnInit() {
    this.sidebar.getStatus().subscribe(() => {
      this.sidebarOpen = !this.sidebarOpen;
    });
  }
  /**
   *
   * @description This event listener's function is to check whether the user has clicked on anything
   * that isn't the sidebar, or they have clicked the close button.
   * This allows the user to close the sidebar without actually having to press the button.
   * Apparently this helped usability when I showed it to some participants
   */
  @HostListener('click', ['$event'])
  onclick(event: MouseEvent) {
    const click = event.target as Element;
    if (this.sidebarOpen) {
      if (click.id === 'sidebarBtn') {
        return;
      }
      if (
        click.parentNode.parentNode.parentNode.nodeName !== 'APP-SIDEBAR' ||
        click.parentElement.nodeName !== 'APP-SIDEBAR' ||
        click.className === 'closeBtn'
      ) {
        this.sidebar.toggleSideBar();
      }
    }
  }
}
