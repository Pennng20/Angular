import { ArticleService } from './../service/article.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviePost } from '../interface/moviepost';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-management',
  standalone: true,
  imports: [ReactiveFormsModule, NgbNavModule, CommonModule],
  templateUrl: './article-management.component.html',
  styleUrl: './article-management.component.scss'
})
export class ArticleManagementComponent implements OnInit {
  private _active = 1;
  private _articleForm: FormGroup;
  private _movies: MoviePost[] = [];
  private _selectedMovieId: number | null = null;
  public imageBase64: string | null = null;
  private articleService: ArticleService = inject(ArticleService);
  private loginService: LoginService = inject(LoginService);
  public router: Router = inject(Router);

  public get active(): number {
    return this._active;
  }

  public set active(value: number) {
    this._active = value;
    this.resetForm(); // 切換頁籤時重置表單
  }

  public get articleForm(): FormGroup {
    return this._articleForm;
  }

  public get movies(): MoviePost[] {
    return this._movies;
  }

  public get selectedMovieId(): number | null {
    return this._selectedMovieId;
  }

  private get currentUser(): any {
    return this.loginService.userSubject.value;
  }
  /**
   * FormGroup
   * @param fb 創建一個表單群組 (_articleForm)
   */
  constructor(private fb: FormBuilder) {
    // 確保在建構函數中初始化表單，設定各欄位的驗證規則
    this._articleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      focus: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }
  public ngOnInit(): void {
    this.loadMovies();
  }

  private loadMovies(): void {
    this._movies = this.articleService.getMovies();
  }

  private resetForm(): void {
    this._articleForm.reset();
    this.imageBase64 = null;
    this._selectedMovieId = null;
  }
  /**
   * @param event 觸發此方法的事件對象。event.target 代表用戶觸發的<input type="file">元素。
   * 將 event.target 轉換為 HTMLSelectElement，以取得選擇框的屬性。
   * @param input.files 用來取得用戶選擇的文件。
   * @param FileReader 用於將選擇的文件讀取為 Base64 格式。完成後觸發 onload 回調函數。
   */
  public onClickFileSelectBtn(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        this.articleForm.patchValue({ photo: this.imageBase64 });
      };
      reader.readAsDataURL(file);
    }
  }
  /**
   * 修改電影評論
   * @param event 觸發此方法的事件對象，包含用戶選擇的電影 ID。
   * @returns void
   * 將 event.target 轉換為 HTMLSelectElement，以取得選擇框的屬性。
   */
  public onMovieSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    // if null 或 undefined，結束函式
    if (!target) return;

    // + 將字符串轉換為數字
    // if movieId 無效，重置表單並返回
    const movieId = +target.value;
    if (!movieId) {
      this.resetForm();
      return;
    }

    this._selectedMovieId = movieId;
    const selectedMovie = this.articleService.getMovieById(movieId);
    // 用來局部更新表單中的某些欄位
    if (selectedMovie) {
      this._articleForm.patchValue({
        name: selectedMovie.name,
        focus: selectedMovie.focus,
        content: selectedMovie.content,
        photo: selectedMovie.photo
      });
      this.imageBase64 = selectedMovie.photo;
    }
  }
  /**
   * 提交表單
   * 創建一個新的 MoviePost 物件，並將表單的值賦予到它
   */
  public onSubmit(): void {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;
      const authorName = this.currentUser?.username || 'Anonymous';

      const newMovie: MoviePost = {
        id: this.movies.length + 1,
        name: formValue.name,
        focus: formValue.focus,
        author: authorName,
        userId: formValue.userId,
        photo: formValue.photo,
        updateTime: new Date().toLocaleString(),
        content: formValue.content
      };
      // 將新創建的電影添加到文章服務中
      this.articleService.addMovie(newMovie);
      // 重新加載所有電影
      this.loadMovies();
      // 提交表單後重置
      this.resetForm();
    }
  }
  /**
   * 修改文章
   * ...movieToUpdate，將 movieToUpdate 的屬性複製到 updatedMovie 中
   */
  public onEditSubmit(): void {
    if (this.articleForm.valid && this._selectedMovieId) {
      const formValue = this.articleForm.value;
      // 根據選中的電影 ID，獲取要更新的電影資料
      const movieToUpdate = this.articleService.getMovieById(this._selectedMovieId);

      if (movieToUpdate) {
        // 如果電影存在，檢查當前用戶是否為電影作者
        if (this.isMovieAuthor(movieToUpdate)) {
          const updatedMovie: MoviePost = {
            ...movieToUpdate, // 淺拷貝原始電影資料
            name: formValue.name,
            focus: formValue.focus,
            content: formValue.content,
            photo: formValue.photo,
            updateTime: new Date().toLocaleString()
          };
          // 將已經存在的電影資料進行更新
          this.articleService.putMovie(updatedMovie);
          // 重新加載所有電影
          this.loadMovies();
          // 提交表單後重置
          this.resetForm();
        } else {
          alert('您無權修改此文章')
        }
      }
    }
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
      if (confirm('確定要刪除這篇文章嗎？')) {
        this.articleService.deleteMovie(movieId);
        this.loadMovies();
        this.router.navigate(['/']);
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
