import { Component, inject, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from './service/login.service';
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
  /**
   * @private user$私人
   * @type {Observable<{ username: string, picture: string }>} Observable 發出的數據結構
   */
  private user$: Observable<{ username: string, picture: string }>;
  private loginService: LoginService = inject(LoginService);
  public router: Router = inject(Router);

  constructor() {
    this.user$ = this.loginService.user$;
  }

  public getUser$(): Observable<{ username: string, picture: string }> {
    return this.user$;
  }

  public onClickLogoutBtn(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
