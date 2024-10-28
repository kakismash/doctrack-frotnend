import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocationSimpleDTOI } from 'src/app/service/location.service';
import { IonHeader, IonInput, IonButton, IonToolbar, IonTitle, IonButtons, IonContent, IonItem, IonLabel, IonTextarea, IonFooter, IonText, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-location-modal',
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonText, 
    IonFooter,
    IonTextarea,
    IonLabel,
    IonItem,
    IonContent,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonHeader,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './editLocationModal.component.html',
  styleUrl: './editLocationModal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditLocationModalComponent {

  @Input() isNew: boolean = false; // Indicates if we're creating a new location
  @Input() location!: LocationSimpleDTOI;

  // Add a property to track form submission attempts
  submitted = false;

  constructor(private modalController: ModalController) {}

  // Dissmiss the modal without saving
  dismiss() {
    this.modalController.dismiss();
  }

  // Save the changes and dismiss the modal if the form is valid
  saveLocation(form: any) {
    this.submitted = true;
    if (form.valid) {
      this.modalController.dismiss({ location: this.location, isNew: this.isNew });
    }
  }

}
