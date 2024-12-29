import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { Super_adminGuard } from './guard/super_admin.guard';
import { AdminGuard } from './guard/admin.guard';
import { InvitationCreateOrganizationGuardGuard } from './guard/InvitationCreateOrganizationGuard.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'super_admin',
    loadChildren: () => import('./super_admin/super_admin.module').then(m => m.Super_adminModule),
    canActivate: [AuthGuard, Super_adminGuard], // Use canActivate here
    data: {
      role: 'super_admin'
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],  // Use canActivate instead of canLoad
  },
  {
    path: 'invite_create_organization',
    loadComponent: () => import('./standalone/createOrganizationIntuitive/createOrganizationIntuitive.component').then(m => m.CreateOrganizationIntuitiveComponent),
    canActivate: [InvitationCreateOrganizationGuardGuard],  // Use canActivate instead
  },
  {
    path: '',
    redirectTo: 'login',  // Consider using login or a home page instead of admin
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',  // Consider redirecting to login or a generic error page
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
