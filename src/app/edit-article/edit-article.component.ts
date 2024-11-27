import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePost } from '../interface/moviepost';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../service/article.service';
import { LoginService } from '../service/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})
export class EditArticleComponent {
  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   */
  private _movies: MoviePost[] = [];
  private _articleForm: FormGroup;
  private _selectedMovieId: number = 0;
  private _imageBase64: string = '';

  public get articleForm(): FormGroup {
    return this._articleForm;
  }

  public get movies(): MoviePost[] {
    return this._movies;
  }

  public get selectedMovieId(): number {
    return this._selectedMovieId;
  }

  public get imageBase64(): string {
    return this._imageBase64;
  }

  private get currentUser(): any {
    return this.loginService.userSubject$.value;
  }
  /**
   * FormGroup
   * @param fb 創建一個表單群組 (_articleForm)
   */
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private loginService: LoginService,
  ) {
    // 確保在建構函數中初始化表單，設定各欄位的驗證規則
    this._articleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      focus: ['', [Validators.required, Validators.maxLength(22)]],
      content: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.getMoieList();
  }

  private getMoieList(): void { //getMoieList
    this._movies = this.articleService.getMovies();
  }

  private resetForm(): void {
    this._articleForm.reset();
    this._imageBase64 = '';
    this._selectedMovieId = 0;
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
        this._imageBase64 = reader.result as string;
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
  public onChangeMovieSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    // if null 或 undefined，結束函式
    if (!target) return;

    // + 將字符串轉換為數字
    // if movieId 無效，重置表單並返回
    const movieId = +target.value; //number
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
      this._imageBase64 = selectedMovie.photo;
    }
  }
  /**
   * 修改文章
   * ...movieToUpdate，將 movieToUpdate 的屬性複製到 updatedMovie 中
   */
  public onEditSubmit(): void {
    if ((this.articleForm.valid) && (this._selectedMovieId)) {
      const formValue = this.articleForm.value;
      // 根據選中的電影 ID，獲取要更新的電影資料
      const movieToUpdate = this.articleService.getMovieById(this._selectedMovieId);

      if (movieToUpdate) {
        // 如果電影存在，檢查當前用戶是否為電影作者
        if (this.isMovieAuthor(movieToUpdate)) {
          const updatedMovie: MoviePost = {
            // 淺拷貝原始電影資料
            ...movieToUpdate,
            name: formValue.name,
            focus: formValue.focus,
            content: formValue.content,
            photo: formValue.photo,
            updateTime: new Date().toLocaleString('zh-TW', {
              // 設置為 24 小時制
              hour12: false,
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }),
          };
          // 將已經存在的電影資料進行更新
          this.articleService.putMovie(updatedMovie);
          // 重新加載所有電影
          this.getMoieList();
          // 提交表單後重置
          this.resetForm();
        } else {
          alert('您無權修改此文章')
        }
      }
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
