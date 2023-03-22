import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() toggleSidebarEmit = new EventEmitter<boolean>();

  public toggleSidebarMobile(): void {
    this.toggleSidebarEmit.emit(true);
  }

}
