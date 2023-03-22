import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { navbarData } from '@shared/configurations/navbar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() hideSidebarEmit = new EventEmitter<boolean>();

  @Input() isShowSidebarOverlay = false

  public navbarData = navbarData;
  constructor() {}

  ngOnInit(): void {
  }

  public toggleSidebarMobile(): void {
    this.hideSidebarEmit.emit(false);
  }
}
