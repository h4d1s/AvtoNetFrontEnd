import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string = "";
  loginForm: FormGroup; 

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return;
    }

    const credentials = this.loginForm.value;
    this.userService.login(credentials).subscribe({
      next: (data) => {
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        if(err.error.hasOwnProperty("title")) {
          this.errorMessage = err.error.title;
        } else {
          this.errorMessage = err.error;
        }
      }
    });
  }
}
