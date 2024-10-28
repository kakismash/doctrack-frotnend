import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations/locations.component';
import { DashboardComponent } from '../standalone/dashboard/dashboard.component';
import { ProfileComponent } from '../standalone/profile/profile.component';
import { UsersComponent } from '../standalone/users/users.component';
import { Super_adminComponent } from './super_admin.component';

export const routesChildrens = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page',
      icon: 'grid-sharp',
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users Page',
      icon: 'people-sharp',
    }
  },
  {
    path: 'locations',
    component: LocationsComponent,
    data: {
      title: 'Locations Page',
      icon: 'location-sharp',
    }
  }
]

export const profileChildrenRoutes = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Manage Profile',
      icon: 'person-sharp',
      lottieIcon: 'assets/animations/myAnimations/accountNumber.json'
    }
  }
];

const routes: Routes = [
  {
    path: '',
    component: Super_adminComponent,
    children: [
      ...routesChildrens,
      ...profileChildrenRoutes,
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Super_adminRoutingModule {}
