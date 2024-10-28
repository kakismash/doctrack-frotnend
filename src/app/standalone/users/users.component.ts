import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { DesktopTableComponent } from './desktopTable/desktopTable.component';
import { MobileItemsComponent } from './mobileItems/mobileItems.component';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrl: './users.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    DesktopTableComponent,
    MobileItemsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  isMobile: boolean = false;
  
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    // Detect screen size and set `isMobile` accordingly
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }
}
