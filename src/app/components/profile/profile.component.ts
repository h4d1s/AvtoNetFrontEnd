import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;
  user: User = new User();
  successMessage = "";
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.user = this.userService.getUser();

    this.profileForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      street: [this.user.street, [Validators.required]],
      city: [this.user.city, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, []]
    });
  }

  onSubmit() {
    if(!this.profileForm.valid) {
      return;
    }

    const userData = this.profileForm.value;
    const userId = this.user.id;
    this.userService.update(userId, userData).subscribe({
      next: (data) => {
        this.successMessage = "Profile updated successfully.";
        this.user = this.userService.getUser();
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    });
  }
}
