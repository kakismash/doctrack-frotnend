import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';

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
    component: PanelComponent,
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
export class PanelComponentRoutingModule {}
