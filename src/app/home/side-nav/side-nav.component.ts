import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivationEnd, Router, RouterModule } from '@angular/router';
import { IonItem, IonList, IonIcon, IonLabel, IonButton } from "@ionic/angular/standalone";
import { routesChildrens } from '../panel-routing.module';
import { filter } from 'rxjs';

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

  routes = [...routesChildrens];
  currentRoute: string = '';

  constructor(private router: Router) {}

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
