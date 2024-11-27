import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../service/article.service';
import { Router } from '@angular/router'
import { MoviePost } from '../interface/moviepost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-delete-article',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './delete-article.component.html',
  styleUrl: './delete-article.component.scss'
})
export class DeleteArticleComponent {
  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   */
  private _movies: MoviePost[] = [];
  private _articleForm: FormGroup;

  public get movies(): MoviePost[] {
    return this._movies;
  }

  public get articleForm(): FormGroup {
    return this._articleForm;
  }

  private get currentUser(): any {
    return this.loginService.userSubject$.value;
  }

  public ngOnInit(): void {
    this.getMoieList();
  }

  private getMoieList(): void { //getMoieList
    this._movies = this.articleService.getMovies();
  }

  /**
     * FormGroup
     * @param fb 創建一個表單群組 (_articleForm)
     */
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private loginService: LoginService,
    private router: Router
  ) {
    // 確保在建構函數中初始化表單，設定各欄位的驗證規則
    this._articleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      focus: ['', [Validators.required, Validators.maxLength(22)]],
      content: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }
  /**
   * 刪除文章
   * @param movieId 要刪除的電影Id
   * movieToDelete調用getMovieById方法取得電影資料
   * 如果有電影存在且是該電影作者即可刪除，否則false
   */
  public onDeleteSelected(movieId: number): void {
    const movieToDelete = this.articleService.getMovieById(movieId);
    if (movieToDelete && this.isMovieAuthor(movieToDelete)) {
      if (confirm('確定要刪除這篇文章嗎？')) { //帶入電影標題
        this.articleService.deleteMovie(movieId);
        this.getMoieList();
        this.router.navigate(['/movielist']);
      }
    } else {
      alert('您無權刪除此文章')
    }
  }
  /**
   * 檢查目前登入的使用者是否是文章作者
   * @param movie MoviePost的類型
   * @returns 若為文章作者回傳 true，否則回傳 false
   */
  private isMovieAuthor(movie: MoviePost): boolean {
    const user = this.currentUser;
    return user && movie.userId === user.id;
  }
}
