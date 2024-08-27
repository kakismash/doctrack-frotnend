import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'panel.component.html',
  styleUrls: ['panel.component.scss'],
})
export class PanelComponent implements OnInit {

  currentPageTittle: string = '';
  currentPageIcon: string = '';
  lottieIconPath: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to ActivationEnd events to update title and icon when navigation ends
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null)
    ).subscribe(event => {
      const activationEndEvent = event as ActivationEnd;
      const snapshot = activationEndEvent.snapshot;
      if (snapshot.data) {
        this.currentPageTittle = snapshot.data['title'] || this.currentPageTittle;
        this.currentPageIcon = snapshot.data['icon'] || this.currentPageIcon;
        this.lottieIconPath = snapshot.data['lottieIcon'] || '';
      }
    });
  }

}
