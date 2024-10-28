import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { IonSearchbar, IonList, IonItem, IonLabel, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-location-popover',
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonList, IonSearchbar, 
    CommonModule, FormsModule
  ],
  templateUrl: './locationPopover.component.html',
  styleUrl: './locationPopover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPopoverComponent { 
  @Input() allLocations: any[] = [];  // Receive locations from the parent component
  filteredLocations: any[] = [];
  locationFilter: string = '';

  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    this.filteredLocations = [...this.allLocations];  // Initialize the filtered locations
  }

  // Filter locations based on search term
  onSearchLocation(filter: string) {
    this.filteredLocations = this.allLocations.filter(location =>
      location.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  // Handle location selection and close the popover
  selectLocation(location: any) {
    this.popoverController.dismiss(location);  // Pass the selected location back to the parent
  }
}
