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

  public get articleForm(): FormGroup {
    return this._articleForm;
  }

  public get movies(): MoviePost[] {
    return this._movies;
  }

  public get imageBase64(): string {
    return this._imageBase64;
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
      content: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }

  private getMoieList(): void { //getMoieList
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
}
