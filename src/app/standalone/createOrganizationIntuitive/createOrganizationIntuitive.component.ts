import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-organization-intuitive',
  standalone: true,
  imports: [IonLabel, IonItem, 
    CommonModule,
    IonContent,
    IonInput,
    IonButton,
    ReactiveFormsModule,
    MatStepperModule, // Import Material Stepper
  ],
  templateUrl: './createOrganizationIntuitive.component.html',
  styleUrls: ['./createOrganizationIntuitive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrganizationIntuitiveComponent implements OnInit {
  organizationForm!: FormGroup;
  userForm!: FormGroup;
  isSubmitting = false;

  role!: string;
  userId!: number;
  username!: string;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef, // Used for manual change detection
    private router: Router
  ) {}

  ngOnInit() {
    // Initialize forms

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { role: string; userId: string; username: string };

    console.log('State:', state);
    if (state) {
      this.role = state.role;
      this.userId = Number(state.userId);
      this.username = state.username;
    }

    this.organizationForm = this.fb.group({
      organizationName: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    this.isSubmitting = true;

    // Combine data from both forms
    const formData = {
      ...this.organizationForm.value,
      ...this.userForm.value,
    };

    // // Call API to submit data
    // this.apiService.createOrganization(formData).subscribe(
    //   (response) => {
    //     console.log('Organization created successfully:', response);
    //     this.isSubmitting = false;
    //     this.cdr.markForCheck(); // Update UI
    //   },
    //   (error) => {
    //     console.error('Error creating organization:', error);
    //     this.isSubmitting = false;
    //     this.cdr.markForCheck(); // Update UI
    //   }
    // );
  }
}
