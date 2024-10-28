import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponentRoutingModule } from './admin-routing.module';
import { LottieStandaloneComponent } from '../lottie/lottie.standalone.component';
import { SideNavComponent } from '../standalone/side-nav/side-nav.component';
import { ProfileNavComponent } from '../standalone/profileNav/profile-nav.component';
import { MobileItemsComponent } from '../standalone/users/mobileItems/mobileItems.component';
import { DesktopTableComponent } from '../standalone/users/desktopTable/desktopTable.component';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminComponentRoutingModule,
    LottieStandaloneComponent,
    SideNavComponent,
    ProfileNavComponent,
    MatButtonModule,
    MatIconModule,
    SideNavComponent,
    LottieStandaloneComponent,
    MobileItemsComponent,
    DesktopTableComponent
],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule {}
