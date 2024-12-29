import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonHeader,
  IonInput,
  IonButton,
  IonChip,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonItem,
  IonLabel,
  IonTextarea,
  IonCheckbox,
  IonFooter,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonPopover,
  IonList,
  IonIcon,
  IonSelectOption,
  IonSelect,
} from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationSimpleDTOI } from 'src/app/service/organization.service';
import { LocationService, LocationSimpleDTOI } from 'src/app/service/location.service';

@Component({
  selector: 'app-edit-organization-modal',
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonText,
    IonTextarea,
    IonLabel,
    IonItem,
    IonContent,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonInput,
    IonChip,
    IonList,
    IonHeader,
    FormsModule,
    CommonModule,
    IonSelect,
    IonCheckbox,
    IonSelectOption,
    ReactiveFormsModule,
  ],
  templateUrl: './editOrganizationModal.component.html',
  styleUrls: ['./editOrganizationModal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOrganizationModalComponent implements OnInit {
  @Input() isNew: boolean = false; // Indicates if we're creating a new organization
  @Input() organization!: OrganizationSimpleDTOI;

  submitted = false;
  locationSearchQuery: string = ''; // Search query for locations
  allLocations: LocationSimpleDTOI[] = []; // All available locations
  filteredLocations: LocationSimpleDTOI[] = []; // Filtered locations based on search

  constructor(private modalController: ModalController, private locationService: LocationService) {}

  ngOnInit() {
    // Ensure `organization.locations` is initialized
    if (!this.organization.locations) {
      this.organization.locations = [];
    }
    this.loadLocations();
  }

  // Dismiss the modal without saving
  dismiss() {
    this.modalController.dismiss();
  }

  // Load all locations from the service
  loadLocations() {
    this.locationService.getAllLocations('').subscribe((locations) => {
      this.allLocations = locations ?? [];
      this.filteredLocations = [...this.allLocations]; // Initialize filtered locations
    });
  }

  // Filter locations dynamically as the user types
  filterLocations() {
    this.filteredLocations = this.allLocations.filter((location) =>
      location.name.toLowerCase().includes(this.locationSearchQuery.toLowerCase())
    );
  }

  // Toggle selection of a location
  toggleLocationSelection(location: LocationSimpleDTOI) {
    const index = this.organization.locations?.findIndex((loc) => loc.id === location.id);
    if (index === -1 || index === undefined) {
      this.organization.locations?.push(location); // Add if not already selected
    } else {
      this.organization.locations?.splice(index, 1); // Remove if already selected
    }
  }

  // Check if a location is selected
  isSelected(location: LocationSimpleDTOI): boolean {
    return !!this.organization.locations?.some((loc) => loc.id === location.id);
  }

  // Remove a location from the selected list
  removeLocation(index: number) {
    this.organization.locations?.splice(index, 1);
  }

  // Save the changes and dismiss the modal if the form is valid
  saveOrganization(form: any) {
    this.submitted = true;
    if (form.valid) {
      this.modalController.dismiss(this.organization);
    }
  }
}
