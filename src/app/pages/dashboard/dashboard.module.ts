import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from '@shared/modules/sidebar/sidebar.module';
import { NavbarModule } from '@shared/modules/navbar/navbar.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    SidebarModule,
    NavbarModule
  ],
})
export class DashboardModule {}
