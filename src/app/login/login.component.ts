import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: success => {
          console.log('Login success:', success);
          if (success) {
            if (this.authService.isSuperAdmin()) {
              this.router.navigate(['/superadmin']);
            } else {
              this.router.navigate(['/admin']);
            }
          } else {
            this.errorMessage = 'Invalid login credentials';
          }

        },
        error: error => {
          this.errorMessage = 'An error occurred during login. Please try again.';
          console.error('LoginComponent error:', error);
        }
      });
    }
  }
}
