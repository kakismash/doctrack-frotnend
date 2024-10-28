import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../standalone/dashboard/dashboard.component';
import { ProfileComponent } from '../standalone/profile/profile.component';
import { UsersComponent } from '../standalone/users/users.component';
import { AdminComponent } from './admin.component';

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
    component: AdminComponent,
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
export class AdminComponentRoutingModule {}
