import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { addIcons } from "ionicons";
import { UserI } from 'src/app/service/user.service';

@Component({
  selector: 'app-desktop-table',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule
  ],
  templateUrl: './desktopTable.component.html',
  styleUrl: './desktopTable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource([
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Doe', email: 'jane@example.com', role: 'User' },
    { name: 'Mike Ross', email: 'mike@example.com', role: 'Moderator' }
    // Add more users as needed
  ]);

  searchTerm: string = '';  // For search input
  currentPage = 1;
  pageSize = 10;  // Show 10 items per page for desktop
  totalPages = Math.ceil(this.dataSource.data.length / this.pageSize);
  paginationNumbers: number[] = [];

  @ViewChild(MatSort) sort!: MatSort;  // Add non-null assertion operator (!)

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.paginateUsers();
    this.updatePaginationNumbers();
  }

  applyFilter(event: any) {
    this.searchTerm = event.target.value; // Update search term
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    this.currentPage = 1;  // Reset to first page after filter
    this.totalPages = Math.ceil(this.dataSource.filteredData.length / this.pageSize);
    this.paginateUsers();
    this.updatePaginationNumbers();
  }

  paginateUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = this.dataSource.filteredData.slice(startIndex, endIndex);
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
    // Display 3 to 4 clickable page numbers based on current page
    this.paginationNumbers = [];
    let start = Math.max(1, this.currentPage - 1);
    let end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) {
      this.paginationNumbers.push(i);
    }
  }
}
