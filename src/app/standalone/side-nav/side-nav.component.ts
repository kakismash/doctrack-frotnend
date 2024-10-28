import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivationEnd, Router, RouterModule } from '@angular/router';
import { IonItem, IonList, IonIcon, IonLabel, IonButton } from "@ionic/angular/standalone";
import { filter } from 'rxjs';
import { routesChildrens as superAdminRouteChildrens } from 'src/app/super_admin/super_admin-routing.module';
import { routesChildrens as adminRoutesChildrens } from 'src/app/admin/admin-routing.module';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [IonLabel, IonIcon, IonList, IonItem, IonButton,
    CommonModule,
    RouterModule
  ],
  templateUrl: 'side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {

  routes: Array<any> = [];
  currentRoute: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  isRouteActive(route: string): boolean {
    return this.currentRoute === route;
  }

  ngOnInit() {

    if (this.authService.isSuperAdmin()) {
      this.routes = [...superAdminRouteChildrens];
    } else {
      this.routes = [...adminRoutesChildrens];
    }

    this.router.events
    .pipe(filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null))
    .subscribe(event => {
      this.currentRoute = (event as ActivationEnd).snapshot.routeConfig?.path || '';
    });
  }

}
