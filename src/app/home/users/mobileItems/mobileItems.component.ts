import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonLabel, IonContent, IonButton, IonSearchbar } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { UserI } from 'src/app/service/user.service';

@Component({
  selector: 'app-mobile-items',
  standalone: true,
  imports: [IonSearchbar, 
    IonButton,
    IonContent,
    IonSearchbar,
    IonLabel,
    IonItem,
    IonList,
    CommonModule,
    FormsModule
  ],
  templateUrl: './mobileItems.component.html',
  styleUrl: './mobileItems.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileItemsComponent {

  users: Array<UserI> = [
    {
      id: 1,
      username: '',
      email: 'john@example.com',
      role: 'Admin',
      firstname: 'John',
      lastname: 'Doe',
      phone: '3432423355'
    },
    {
      id: 2,
      username: '',
      email: 'jane@example.com',
      role: 'User',
      firstname: 'Jane',
      lastname: 'Doe',
      phone: '3432423354'
    },
    {
      id: 3,
      username: '',
      email: 'mike@example.com',
      role: 'User',
      firstname: 'Mike',
      lastname: 'Ross',
      phone: '3432423356'
    }
  ];

  searchTerm: String = '';
  filteredUsers: Array<UserI> = [...this.users]; // Initially, show all users
  paginatedUsers: Array<UserI> = [];
  currentPage: number = 1;
  pageSize: number = 10; // Number of users per page
  totalPages: number = Math.ceil(this.filteredUsers.length / this.pageSize);

  paginationNumbers: number[] = [];

  constructor() {
    this.paginateUsers();
    this.updatePaginationNumbers();
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.paginateUsers();
    this.updatePaginationNumbers();
  }

  paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
      this.updatePaginationNumbers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateUsers();
      this.updatePaginationNumbers();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateUsers();
    this.updatePaginationNumbers();
  }

  updatePaginationNumbers() {
    this.paginationNumbers = [];
    let start = Math.max(1, this.currentPage - 1);
    let end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) {
      this.paginationNumbers.push(i);
    }
  }
}
