import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Super_adminRoutingModule } from './super_admin-routing.module';
import { LottieStandaloneComponent } from '../lottie/lottie.standalone.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Super_adminComponent } from './super_admin.component';
import { LocationsComponent } from './locations/locations.component';
import { ProfileNavComponent } from '../standalone/profileNav/profile-nav.component';
import { SideNavComponent } from '../standalone/side-nav/side-nav.component';
import { MobileItemsComponent } from '../standalone/users/mobileItems/mobileItems.component';
import { DesktopTableComponent } from '../standalone/users/desktopTable/desktopTable.component';



@NgModule({
  declarations: [
    Super_adminComponent,
    LocationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieStandaloneComponent,
    SideNavComponent,
    ProfileNavComponent,
    MatButtonModule,
    MatIconModule,
    SideNavComponent,
    LottieStandaloneComponent,
    MobileItemsComponent,
    DesktopTableComponent,
    Super_adminRoutingModule
  ],

})
export class Super_adminModule { }
