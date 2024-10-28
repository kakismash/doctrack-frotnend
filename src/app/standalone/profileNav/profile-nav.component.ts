import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivationEnd, Router, RouterModule } from '@angular/router';
import { IonList, IonIcon, IonItem, IonLabel, IonButton } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/service/auth.service';
import { filter } from 'rxjs';
import { profileChildrenRoutes as superadminProfileChildrenRoutes } from 'src/app/super_admin/super_admin-routing.module';
import { profileChildrenRoutes as adminProfileChildrenRoutes } from 'src/app/admin/admin-routing.module';

@Component({
  selector: 'app-profile-nav',
  standalone: true,
  imports: [
    IonButton,
    IonLabel,
    IonItem,
    IonIcon,
    IonList,
    CommonModule,
    RouterModule
  ],
  templateUrl: 'profile-nav.component.html',
  styleUrl: './profile-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileNavComponent implements OnInit {

  routes: Array<IRoute> = [];
  currentRoute: string = '';
  profileRoute!: any;

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    console.log('Logging out...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isRouteActive(route: string): boolean {
    return this.currentRoute === route;
  }

  ngOnInit() {

    if (this.authService.isSuperAdmin()) {
      this.routes = [...superadminProfileChildrenRoutes];
    } else {
      this.routes = [...adminProfileChildrenRoutes];
    }

    this.routes.filter(route => route.path === 'profile')[0];

    this.router.events
    .pipe(filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null))
    .subscribe(event => {
      this.currentRoute = (event as ActivationEnd).snapshot.routeConfig?.path || '';
    });
  }

 }


interface IRoute {
  path: string;
  component: any;
  data: any;
}
