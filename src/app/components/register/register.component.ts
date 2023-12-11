import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = "";
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if(!this.registerForm.valid) {
      return;
    }

    this.errorMessage = "";
    this.successMessage = "";

    const formData = this.registerForm.value;
    this.userService.register(formData).subscribe({
      next: (data) => {
        this.successMessage = "User successfuly created.";
        this.clearForm();
      },
      error: (err) => {
        if(err.error.hasOwnProperty("errors")) {
          let errors: Array<{ code: string, description: string }> = err.error.errors;
          this.errorMessage = errors.map((e) => e.description).join("\n");
        } else {
          this.errorMessage = err.error;
        }
      }
    });
  }

  clearForm() {
    this.registerForm.patchValue({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      street: '',
      city: '',
      phoneNumber: '',
    });
  }
}
