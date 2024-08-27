import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PanelComponentRoutingModule } from './panel-routing.module';
import { LottieStandaloneComponent } from '../lottie/lottie.standalone.component';
import { SideNavComponent } from "./side-nav/side-nav.component";
import { ProfileNavComponent } from './profileNav/profile-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelComponentRoutingModule,
    LottieStandaloneComponent,
    SideNavComponent,
    ProfileNavComponent,
    MatButtonModule,
    MatIconModule,
    SideNavComponent,
    LottieStandaloneComponent
],
  declarations: [
    PanelComponent,
    DashboardComponent,
    UsersComponent,
    ProfileComponent
  ]
})
export class PanelModule {}
