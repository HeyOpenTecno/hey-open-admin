import { Component } from '@angular/core';
import { SidebarToggle } from '@shared/models/sidebar.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public showSidebar = false;

  public toggleSidebar(event: boolean) {
    this.showSidebar = event;
  }

  public toggleSidebarFromNav(event: boolean) {
    this.showSidebar = event;
  }

}
