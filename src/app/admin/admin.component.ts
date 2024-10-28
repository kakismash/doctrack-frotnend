import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss'],
})
export class AdminComponent implements OnInit {

  isSuperAdmin: boolean = false;    // Determines if the user is a super admin
  currentPageTittle: string = '';
  currentPageIcon: string = '';
  lottieIconPath: string = '';

  selectedLocation: any = null;     // The selected location
  locationFilter: string = '';      // The search filter for locations
  filteredLocations: any[] = [];    // Filtered locations for super admins
  userLocations: any[] = [];        // Locations available to regular users
  allLocations: any[] = [];         // All locations for super admins


  constructor(private router: Router,
              private authService: AuthService, 
              private locationService: LocationService) {}

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
      this.loadUserLocations(); // Load locations available to regular users from the token
      this.selectedLocation = this.authService.getDefaultLocationFromToken();
    });
  }

  // Load locations available to regular users (from the token)
  loadUserLocations() {
    this.userLocations = this.authService.getLoggedLocationsFromToken(); // Assuming the token contains an array of locations
  }

  // Handle search/filter for super admin locations
  onSearchLocation(filter: string) {
    this.filteredLocations = this.allLocations.filter(location =>
      location.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Handle location selection
  onLocationSelected(event: any) {
    this.selectedLocation = event.detail.value;
    this.authService.setSelectedLocation(this.selectedLocation); // Optionally save the selected location
  }

  // Open profile menu
  openProfileMenu() {
    console.log('Opening profile menu...');
    // Add logic to open the profile menu
  }

}
