import { ArticleService } from './service/article.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from './service/login.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviePost } from './interface/moviepost';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * @type {Observable<{ username: string, picture: string }>} Observable 發出的數據結構
   */
  private userObserver: Observable<{ id: number, username: string, picture: string }>;
  private _movieData: MoviePost[] = [];

  public get movieData(): MoviePost[] {
    return this._movieData;
  }

  public set movieData(value: MoviePost[]) {
    this._movieData = value;
  }

  constructor(
    private loginService: LoginService,
    public router: Router,
    public articleService: ArticleService) {
    this.userObserver = this.loginService.userSubject$ as Observable<{ id: number, username: string, picture: string }>;
  }

  public getUser$(): Observable<{ id: number, username: string, picture: string }> {
    return this.userObserver;
  }

  public onClickLogoutBtn(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  // 判斷是不是登入頁面
  public isLoginPage(): boolean {
    return this.router.url.includes('/login');
  }
}
