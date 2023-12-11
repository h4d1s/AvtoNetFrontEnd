import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  currentUser: User = new User();
  currentUserRoles: string[] = [];

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = userService.isAuthenticated();
      this.currentUserRoles = this.userService.getUserRoles();
    });
    this.currentUserRoles = this.userService.getUserRoles();
  }

  logout() {
    this.userService.logout();
  }
}
