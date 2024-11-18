import { ArticleService } from './../service/article.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviePost } from '../interface/moviepost';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-article-management',
  standalone: true,
  imports: [ReactiveFormsModule, NgbNavModule, CommonModule],
  templateUrl: './article-management.component.html',
  styleUrl: './article-management.component.scss'
})

export class ArticleManagementComponent {
  /**
   * @private 將變數都設為私人的
   * @type {number} 數字型別
   */
  private _active: number = 1;
  private _articleForm: FormGroup;
  private _movies: MoviePost[] = [];
  private _selectMovie: number[] = [];
  private articleService: ArticleService = inject(ArticleService);
  private loginService: LoginService = inject(LoginService);
  public imageBase64: string | null = null;

  public get active(): number {
    return this._active;
  }

  public get articleForm(): FormGroup {
    return this._articleForm;
  }

  public get movies(): MoviePost[] {
    return this._movies;
  }

  public get selectMovie(): number[] {
    return this._selectMovie;
  }

  private get currentUser(): any {
    return this.loginService.userSubject.value;
  }
  /**
   * @param fb FormBuilder 用來創建FormGroup表單
   */
  constructor(private fb: FormBuilder) {
    this._articleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      focus: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', Validators.required],
      photo: [null, Validators.required]
    });
  }
  /**
   * if是否驗證成功，獲取當前填寫的所有數據
   */
  public ngOnInit(): void {
    this._movies = this.articleService.getMovies();
  }

  public onClickFileSelectBtn(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        console.log("Base64 Image:", this.imageBase64);
        this.articleForm.patchValue({ photo: this.imageBase64 });
      };
      reader.readAsDataURL(file);
    }
  }
  public onSubmit(): void {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;
      console.log('Form Submitted:', formValue);

      const currentUser = this.currentUser;
      const authorName = currentUser && currentUser.username ? currentUser.username : 'Anonymous';

      const newMovie: MoviePost = {
        id: this.movies.length + 1,
        name: formValue.name,
        focus: formValue.focus,
        author: authorName,
        photo: formValue.photo,
        updateTime: new Date().toLocaleString(),
        content: formValue.content
      };
      //將新增的電影加到articleService中
      console.log('New Movie:', newMovie);
      this.articleService.addMovie(newMovie);
      console.log('Updated Movies List:', this.articleService.getMovies());
      //將新增的清單賦值給movies
      this._movies = [...this.articleService.getMovies()]

      //清空表單
      this.articleForm.reset();

      // 清空圖片預覽
      this.imageBase64 = null;
    }
  }

  // 選擇要處理的文章
  public onMovieSelect(id: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const isChecked = inputElement.checked;
      if (isChecked) {
        this._selectMovie.push(id);
      } else {
        this._selectMovie = this._selectMovie.filter(movieId => movieId !== id);
      }
    }
  }

  //修改所選擇的文章
  public onEditMovies() {
    if (this._selectMovie.length === 1) {
      const movieToEdit = this.articleService.getMovieById(this._selectMovie[0]);
      if (movieToEdit) {
        this._articleForm.patchValue({
          name: movieToEdit.name,
          focus: movieToEdit.focus,
          content: movieToEdit.content,
          photo: movieToEdit.photo
        });
      }
    } else {
      console.log('請選擇一篇文章進行修改')
    }
  }

  //刪除所選擇的文章
  public onDeleteMovie() {
    this._selectMovie.forEach(id => {
      this.articleService.deleteMovie(id);
    });
    this._movies = this.articleService.getMovies();
    this._selectMovie = [];
  }

  public onClickEditSubmitBtn() {
    if (this._articleForm.valid && this._selectMovie.length === 1) {
      const updateMovie: MoviePost = {
        ...this.articleService.getMovieById(this._selectMovie[0]),
        ...this.articleForm.value
      };
      this.articleService.putMovie(updateMovie);
      this._movies = this.articleService.getMovies();
      this._selectMovie = [];
    }
  }
}


