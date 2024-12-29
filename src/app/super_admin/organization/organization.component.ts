import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { OrganizationService, OrganizationSimpleDTOI, OrganizationUpdateDTOI } from 'src/app/service/organization.service';
import { PageableResponse } from 'src/app/service/utils';
import { EditOrganizationModalComponent } from 'src/app/standalone/modal/editOrganizationModal/editOrganizationModal.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationComponent implements OnInit {
  
  isMobile: boolean = false;
  organizations!: OrganizationSimpleDTOI[];

  currentPage = 0;
  pageSize = 10;
  totalPages: number = 0;
  filter = '';
  empty = true;

  selectedCardIndex: number | null = null; // Tracks the selected card index

  // Subject to handle filter input changes
  private filterSubject = new Subject<string>();

  constructor(private breakpointObserver: BreakpointObserver,
              private organizationService: OrganizationService,
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
        this.loadOrganizations();
      });

      this.filterSubject.pipe(
        debounceTime(500), // 500ms delay after the user stops typing
        distinctUntilChanged() // Only trigger if the input value actually changed
      ).subscribe((filterValue: string) => {
        this.filter = filterValue;
        this.currentPage = 0; // Reset to the first page when filtering
        this.loadOrganizations();
      });
  }

  // Load organizations
  loadOrganizations(callback?: Function) {
    this.organizationService
        .getOrganizations(
          this.currentPage,
          this.pageSize,
          this.filter)
        .subscribe((response: PageableResponse<OrganizationSimpleDTOI>) => {
          this.organizations = response.content;
          this.totalPages = response.totalPages;
          this.empty = response.empty;
          this.cdr.markForCheck();
          if (callback) {
            callback();
          }
        });
  }

  // Handle page change
  onPageChange(newPage: number) {
    // Prevent invalid page numbers and load same page
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.loadOrganizations();
    }
  }

  // Handle filter change
  onFilterChange(newFilter: string) {
    this.filterSubject.next(newFilter);
  }

  // Handle Add Organization
  async addOrganization() {
    const newOrganization: OrganizationSimpleDTOI = {
      id: 0, // Temporary id or leave it undefined
      name: '',
      description: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      email: '',
      contactName: '',
      website: '',
      logo: '',
      type: '',
      status: ''
    };

    const modal = await this.modalController.create({
      component: EditOrganizationModalComponent,
      componentProps: {
        organization: newOrganization,
        isEditing: false,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.isNew) {
      this.createOrganization(data.organization);
    }
  }

  // Create Organization
  createOrganization(newOrganization: OrganizationSimpleDTOI) {
    const organizationUpdateDTO: OrganizationUpdateDTOI = {
      ...newOrganization,
      locations: newOrganization.locations?.map(location => location.id) // Convert locations to their IDs
    };

    this.organizationService
        .createOrganization(organizationUpdateDTO)
        .subscribe(() => {
          this.loadOrganizations();
          this.showCreationSuccessToast(newOrganization.name)
        });
  }

  // Show toast for successful creation
  async showCreationSuccessToast(organizationName: string) {
    const toast = await this.toastController.create({
      message: `${organizationName} was created successfully.`,
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

  // Handle Select Organization Card
  selectCard(index: number, event: Event) {
    if (this.selectedCardIndex === index) {
      this.selectedCardIndex = null;
    } else {
      this.selectedCardIndex = index;
    }

    event.stopPropagation();
    this.cdr.markForCheck();
  }

  // Host listener to deselect card on document click
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const selectedCard = this.elRef.nativeElement.querySelector('.selected-card');

    if (selectedCard && !selectedCard.contains(target)) {
      this.selectedCardIndex = null;
      this.cdr.markForCheck();
    }
  }

  // Handle Edit Organization
  async onEdit(organization: OrganizationSimpleDTOI) {
    const modal = await this.modalController.create({
      component: EditOrganizationModalComponent,
      componentProps: {
        organization,
        isEditing: true,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.saveEditedOrganization(data);
    }
  }

  // Handle Save Edited Organization
  saveEditedOrganization(updatedOrganization: OrganizationSimpleDTOI) {

    const organizationUpdateDTO: OrganizationUpdateDTOI = {
      ...updatedOrganization,
      locations: updatedOrganization.locations?.map(location => location.id) // Convert locations to their IDs
    };

    this.organizationService
        .updateOrganization(updatedOrganization.id, organizationUpdateDTO)
        .subscribe(() => {
          console.debug('Organization updated successfully');
          this.loadOrganizations();
        });
  }

  // Show Success Toast for Update
  async showUpdateSuccessToast(organizationName: string) {
    const toast = await this.toastController.create({
      message: `${organizationName} was updated successfully.`,
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

  // Handle Delete Organization
  async onDelete(organization: OrganizationSimpleDTOI) {
    const alert = await this.alertController.create({
      header: 'Delete Organization',
      message: `Are you sure you want to delete ${organization.name}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.debug('User canceled deletion');
          }
        },
        {
          text: 'Yes',
          role: 'destructive',
          handler: () => {
            this.confirmDelete(organization);
          }
        }
      ]
    });

    await alert.present();
  }

  // Confirm Delete Organization
  confirmDelete(organization: OrganizationSimpleDTOI) {
    this.organizationService
        .deleteOrganization(organization.id)
        .subscribe(() => {
          console.debug('Organization deleted successfully');
          this.loadOrganizations(() => {
            this.selectedCardIndex = null;
          });
          this.showDeletionSuccessToast(organization.name);
        });
  }

  // Show Success Toast for Deletion
  async showDeletionSuccessToast(organizationName: string) {
    const toast = await this.toastController.create({
      message: `${organizationName} was deleted successfully.`,
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

}
