import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviePost } from '../interface/moviepost';
import { ArticleService } from '../service/article.service';
import { LoginService } from '../service/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   */
  private _articleForm: FormGroup;
  private _movies: MoviePost[] = [];
  private _imageBase64: string = '';
  private _contentLength: number = 0;
  private _nameLength: number = 0;
  private _focusLength: number = 0;

  public get articleForm(): FormGroup {
    return this._articleForm;
  }

  public get movies(): MoviePost[] {
    return this._movies;
  }

  public get imageBase64(): string {
    return this._imageBase64;
  }
  // 內文 限制字數
  public get contentLength(): number {
    return this._contentLength;
  }

  public set contentLength(value: number) {
    this._contentLength = value;
  }
  // 標題 限制字數
  public get nameLength(): number {
    return this._nameLength;
  }

  public set nameLength(value: number) {
    this._nameLength = value;
  }
  // 金句 限制字數
  public get focusLength(): number {
    return this._focusLength;
  }

  public set focusLength(value: number) {
    this._focusLength = value;
  }

  /**
   * FormGroup
   * @param fb 創建一個表單群組 (_articleForm)
   */
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private loginService: LoginService
  ) {
    this._articleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      focus: ['', [Validators.required, Validators.maxLength(22)]],
      content: ['', [Validators.required, Validators.maxLength(1000)]],
      photo: [null, Validators.required]
    });
  }

  private getMoieList(): void {
    this._movies = this.articleService.getMovies();
  }

  private resetForm(): void {
    this._articleForm.reset();
    this._imageBase64 = '';
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

      // 設定只能上傳圖片格式的檔案
      // includes()用來檢查某個值是否存在於陣列中
      const photoType = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp'];
      if (!photoType.includes(file.type)) {
        alert('請上傳有效的圖片檔案(jpg, png, gif, bmp)');
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this._imageBase64 = reader.result as string;
        this.articleForm.patchValue({ photo: this.imageBase64 });
      };
      reader.readAsDataURL(file);
    }
  }
  /**
   * 提交表單
   * 創建一個新的 MoviePost 物件，並將表單的值賦予到它
   */
  public onSubmit(): void {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;
      // 從當前用戶的資料中獲取 username
      const authorName = this.loginService.userSubject$.value?.username;

      const newMovie: MoviePost = {
        id: this.movies.length + 1,
        name: formValue.name,
        focus: formValue.focus,
        author: authorName,
        userId: formValue.userId,
        photo: formValue.photo,
        // /\//g 正則表達式 \/ 表示斜線字元 / 是分隔符  g 是全域標誌，意味著替換所有的斜線
        updateTime: new Date().toLocaleString('zh-TW', {
          // 設置為 24 小時制
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).replace(/\//g, '-'),
        content: formValue.content
      };

      // 將新創建的電影添加到文章服務中
      this.articleService.addMovie(newMovie);
      // 重新加載所有電影
      this.getMoieList();
      // 提交表單後重置
      this.resetForm();
    }
  }
  public updateContentLength(): void {
    this.contentLength = this.articleForm.get('content')?.value?.length;
  }

  public updateNameLength(): void {
    this.nameLength = this.articleForm.get('name')?.value?.length;
  }

  public updateFocusLength(): void {
    this.focusLength = this.articleForm.get('focus')?.value?.length;
  }
}
