import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LocationService, LocationSimpleDTOI } from 'src/app/service/location.service';
import { PageableResponse } from 'src/app/service/utils';
import { ChangeDetectorRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { EditLocationModalComponent } from 'src/app/standalone/modal/editLocationModal/editLocationModal.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsComponent implements OnInit {

  isMobile: boolean = false;
  locations!: LocationSimpleDTOI[];

  currentPage = 0;
  pageSize = 10;
  totalPages: number = 0;
  filter = '';
  empty = true;

  selectedCardIndex: number | null = null; // Tracks the selected card index

  // Subject to handle filter input changes
  private filterSubject = new Subject<string>();

  constructor(private breakpointObserver: BreakpointObserver,
              private locationService: LocationService,
              private cdr: ChangeDetectorRef,
              private elRef: ElementRef,
              private alertController: AlertController,
              private toastController: ToastController,
              private modalController: ModalController) {
              }

  ngOnInit() {
    // Detect screen size and set `isMobile` accordingly
    this.breakpointObserver.observe([Breakpoints.Handset])

      .subscribe(result => {
        this.isMobile = result.matches;
        this.isMobile ? this.pageSize = 5 : this.pageSize = 10;
        this.loadLocations();
      });

      this.filterSubject.pipe(
        debounceTime(500), // 500ms delay after the user stops typing
        distinctUntilChanged() // Only trigger if the input value actually changed
      ).subscribe((filterValue: string) => {
        this.filter = filterValue;
        this.currentPage = 0; // Reset to the first page when filtering
        this.loadLocations();
      });
  }

  loadLocations(callback?: Function) {
    this.locationService.getLocations(this.currentPage, this.pageSize, this.filter).subscribe((data: PageableResponse<LocationSimpleDTOI>) => {
      console.log('data: ', data);
      this.locations = data.content;
      this.totalPages = data.totalPages;
      this.pageSize = data.size;
      this.currentPage = data.number;
      this.empty = data.empty;
      this.cdr.detectChanges(); // Manually trigger change detection
      if (callback) {
        callback();
      }
    });
  }

  onPageChange(newPage: number) {
    // Prevent invalid page numbers
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadLocations();
    }
  }

  onFilterChange(newFilter: string) {
    this.filterSubject.next(newFilter);
  }

  async addLocation() {
    const newLocation: LocationSimpleDTOI = {
      id: 0, // Temporary id or leave it undefined
      name: '',
      description: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      zip: ''
    };

    const modal = await this.modalController.create({
      component: EditLocationModalComponent,
      componentProps: {
        location: newLocation,
        isNew: true // Indicate that this is a new location
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.isNew) {
      this.createLocation(data.location); // Handle creation
    }
  }

  // Handle creating a new location
  createLocation(newLocation: LocationSimpleDTOI) {
    this.locationService.createLocation(newLocation).subscribe(() => {
      console.log('Location created successfully');
      this.loadLocations(); // Reload the list after creation
      this.showCreationSuccessToast(newLocation.name); // Show success toast
    });
  }

  // Show toast for successful creation
  async showCreationSuccessToast(locationName: string) {
    const toast = await this.toastController.create({
      message: `${locationName} was created successfully.`,
      duration: 3000,
      color: 'success',
      position: 'bottom',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  selectCard(index: number, event: Event) {
    if (this.selectedCardIndex === index) {
      this.selectedCardIndex = null; // Deselect if the same card is clicked again
    } else {
      this.selectedCardIndex = index;
    }
    event.stopPropagation(); // Prevents triggering the document click event
    this.cdr.detectChanges(); // Trigger change detection to update view
  }

  // HostListener to handle clicks outside of the selected card
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const selectedCard = this.elRef.nativeElement.querySelector('.selected-card');

    if (selectedCard && !selectedCard.contains(target)) {
      this.selectedCardIndex = null;
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  // Method to handle the edit button click
  async onEdit(location: LocationSimpleDTOI) {
    const modal = await this.modalController.create({
      component: EditLocationModalComponent,
      componentProps: {
        location: { ...location } // Pass the location data as a prop (clone to prevent binding issues)
      }
    });

    await modal.present();

    // Handle the modal result (when it is dismissed)
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.saveEditedLocation(data); // Save the edited location
    }
  }

  // Method to save the edited location (after dialog is closed)
  saveEditedLocation(updatedLocation: LocationSimpleDTOI) {
    this.locationService.updateLocation(updatedLocation.id, updatedLocation).subscribe(() => {
      console.log('Location updated successfully');
      this.loadLocations(); // Refresh the location list
      this.showUpdateSuccessToast(updatedLocation.name); // Show a success toast
    });
  }

  // Method to show a toast message when the location is updated
  async showUpdateSuccessToast(locationName: string) {
    const toast = await this.toastController.create({
      message: `${locationName} was updated successfully.`,
      duration: 3000, // Toast will be visible for 3 seconds
      color: 'success', // Use Ionic's success color for the toast
      position: 'bottom', // Position at the bottom of the screen
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  // Method to handle the delete button click
  async onDelete(location: LocationSimpleDTOI) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${location.name}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('User canceled deletion');
          }
        },
        {
          text: 'Yes',
          role: 'destructive',
          handler: () => {
            this.confirmDelete(location);
          }
        }
      ]
    });

    await alert.present();
  }

  // Method to delete the location (called after confirmation)
  confirmDelete(location: LocationSimpleDTOI) {
    console.log('Deleting location:', location);
    this.locationService.deleteLocation(location.id).subscribe(() => {
      console.log('Location deleted successfully');
      this.loadLocations(() => {
        this.selectedCardIndex = null; // Deselect the card after deletion
      });
      this.showDeletionSuccessToast(location.name); // Show success message
    });
  }

  // Method to show a toast message when location is successfully deleted
  async showDeletionSuccessToast(locationName: string) {
    const toast = await this.toastController.create({
      message: `${locationName} was deleted successfully.`,
      duration: 3000, // Toast will be visible for 3 seconds
      color: 'success', // Use Ionic's success color for the toast
      position: 'bottom', // Position at the bottom of the screen
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

}
