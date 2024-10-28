import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LocationService } from '../service/location.service';
import { PopoverController } from '@ionic/angular';
import { LocationPopoverComponent } from '../standalone/locationPopover/locationPopover.component';

@Component({
  selector: 'app-admin',
  templateUrl: 'super_admin.component.html',
  styleUrls: ['super_admin.component.scss'],
})
export class Super_adminComponent implements OnInit {

  currentPageTittle: string = '';
  currentPageIcon: string = '';
  lottieIconPath: string = '';

  isSuperAdmin: boolean = false;    // Determines if the user is a super admin
  selectedLocation: any = null;     // The selected location
  locationFilter: string = '';      // The search filter for locations
  filteredLocations: any[] = [];    // Filtered locations for super admins
  userLocations: any[] = [];        // Locations available to regular users
  allLocations: any[] = [];         // All locations for super admins
  showDropdown: boolean = false; // Controls dropdown visibility

  constructor(private router: Router,
              private popoverController: PopoverController,
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
      this.isSuperAdmin = this.authService.isSuperAdmin(); // Check if the user is a super admin

      this.loadAllLocations(); // Load all locations for super admins

    });
  }

  // Load all locations for super admin
  loadAllLocations(searchTerm: string = '') {
    this.locationService.getAllLocations(searchTerm).subscribe(locations => {
      this.allLocations = locations;
      this.filteredLocations = locations; // Start with all locations available
    });
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

  // Handle key press to detect "Enter"
  onKeyPress(event: Event) {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.showDropdown = true; // Show dropdown when "Enter" is pressed
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Function to present the popover
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LocationPopoverComponent,  // Use the LocationPopoverComponent here
      event: ev,
      translucent: true,
      componentProps: {
        allLocations: this.allLocations  // Pass locations to the popover component
      },
      cssClass: 'custom-popover',
    });

    // Attach event to handle when the popover is dismissed
    popover.onDidDismiss().then((result) => {
      if (result.data) {
        this.selectedLocation = result.data;
      }
    });

    await popover.present();
  }

  // Handle location selection
  selectLocation(location: any) {
    this.selectedLocation = location;
    this.popoverController.dismiss(location);  // Dismiss the popover with the selected location
  }

}
