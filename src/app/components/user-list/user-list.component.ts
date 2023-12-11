import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { PaginationComponent } from '../../layout/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PaginationComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.userService.getAll({
      page: this.currentPage
    }).subscribe({
      next: (response) => {
        this.users = response.body;

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

  deleteUser(e: Event, id: string) {
    e.preventDefault();

    this.userService.delete(id).subscribe({
      next: (data) => {
        this.fetchData();
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
}
