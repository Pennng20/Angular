import { Component } from '@angular/core';
import { LogInService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  private _loginForm!: FormGroup;
  private _loginError: boolean = false;
  private _username: string = '';
  private _welcomeMessage: boolean = false;
  public loginError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get loginForm(): FormGroup {
    return this._loginForm;
  }

  public get loginError(): boolean {
    return this._loginError;
  }

  public get username(): string {
    return this._username;
  }

  public get welcomeMessage(): boolean {
    return this._welcomeMessage;
  }

  constructor(
    public loginService: LogInService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this._loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public onLoginBtn() {
    console.log('Form valid:', this.loginForm.valid);
    if (this.loginForm.valid) {
      const { username, password, email } = this.loginForm.value;
      const success = this.loginService.login(username, password, email);
      console.log('Login success:', success);

      if (success) {
        this.loginError$.next(false);
        this._username = username;
        this._welcomeMessage = true;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        this.loginError$.next(true);
      }
    } else {
      this.loginError$.next(true);
    }
  }

  public onLogoutBtn() {
    this.loginService.logout();
    this._username = '';
    this._welcomeMessage = false;
  }
}
