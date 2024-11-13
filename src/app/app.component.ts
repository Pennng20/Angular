import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogInService } from './login.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  user$: Observable<{ username: string, picture: string }>;

  constructor(private loginService: LogInService, public router: Router) {
    this.user$ = this.loginService.user$;
  }

  public onLogoutBtn() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
