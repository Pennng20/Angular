import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogInService } from './login.service';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LogInComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoggedIn: boolean = false;
  loggedInUser: any = null;

  constructor(private loginService: LogInService, private router: Router) {
    this.loginService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.loggedInUser = user;
    });
  }

  onLogoutBtn() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
