import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { ListingDTO } from '../../DTOs/listingDTO.model';
import { PaginationComponent } from '../../layout/pagination/pagination.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PaginationComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  listings: ListingDTO[] = [];
  errorMessage: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private userService: UserService,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.listingService.getAll({
      userId: this.userService.getUser().id,
      pageSize: 5,
      page: this.currentPage
    }).subscribe({
      next: (response) => {
        this.listings = response.body;

        const headers = response.headers;
        const paginationHeader = headers.get('X-Pagination');
        var paginationInfo = JSON.parse(paginationHeader || '{}');
        this.currentPage = paginationInfo.CurrentPage;
        this.itemsPerPage = paginationInfo.PageSize;
        this.totalItems = paginationInfo.TotalCount;
        this.totalPages = paginationInfo.TotalPages;
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  deleteListing(e: Event, id: string) {
    e.preventDefault();
    
    this.listingService.delete(id).subscribe({
      next: (data) => {
        this.fetchData();
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    });
  }
}
