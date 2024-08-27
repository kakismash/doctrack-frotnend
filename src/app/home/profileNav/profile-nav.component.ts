import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivationEnd, Router, RouterModule } from '@angular/router';
import { IonList, IonIcon, IonItem, IonLabel, IonButton } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/service/auth.service';
import { profileChildrenRoutes } from '../panel-routing.module';
import { filter } from 'rxjs';

@Component({
  selector: 'app-profile-nav',
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonIcon, IonList,
    CommonModule,
    RouterModule
  ],
  templateUrl: 'profile-nav.component.html',
  styleUrl: './profile-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileNavComponent implements OnInit {

  routes = [...profileChildrenRoutes];
  currentRoute: string = '';
  profileRoute = this.routes.filter(route => route.path === 'profile')[0];

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
    this.router.events
    .pipe(filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null))
    .subscribe(event => {
      this.currentRoute = (event as ActivationEnd).snapshot.routeConfig?.path || '';
    });
  }

 }
