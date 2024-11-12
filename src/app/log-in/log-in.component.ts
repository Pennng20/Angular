import { routes } from './../app.routes';
import { Component } from '@angular/core';
import { LogInService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  loginForm: FormGroup;
  loginError: boolean = false;
  username: string = '';
  welcomeMessage: boolean = false;

  constructor(
    public loginService: LogInService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onLoginBtn() {
    if (this.loginForm.valid) {
      const { username, password, email } = this.loginForm.value;
      const success = this.loginService.login(username, password, email);
      if (success) {
        this.loginError = false;
        this.username = username;

        this.welcomeMessage = true;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        this.loginError = true;
      }
    } else {
      this.loginError = true;
    }
  }

  onLogoutBtn() {
    this.loginService.logout();
    this.username = '';
    this.welcomeMessage = false;
  }
}
