import { ArticleService } from './../service/article.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
export class ArticleManagementComponent implements OnInit {
  private _active = 1;
  private _articleForm: FormGroup;
  private _movies: MoviePost[] = [];
  private _selectedMovieId: number | null = null;
  private articleService: ArticleService = inject(ArticleService);
  private loginService: LoginService = inject(LoginService);
  public imageBase64: string | null = null;

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

  constructor(private fb: FormBuilder) {
    // 確保在建構函數中初始化表單
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

  public onClickFileSelectBtn(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        this.articleForm.patchValue({ photo: this.imageBase64 });
      };
      reader.readAsDataURL(file);
    }
  }

  public onMovieSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (!target) return;

    const movieId = +target.value;
    if (!movieId) {
      this.resetForm();
      return;
    }

    this._selectedMovieId = movieId;
    const selectedMovie = this.articleService.getMovieById(movieId);

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

  public onSubmit(): void {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;
      const authorName = this.currentUser?.username || 'Anonymous';

      const newMovie: MoviePost = {
        id: this.movies.length + 1,
        name: formValue.name,
        focus: formValue.focus,
        author: authorName,
        photo: formValue.photo,
        updateTime: new Date().toLocaleString(),
        content: formValue.content
      };

      this.articleService.addMovie(newMovie);
      this.loadMovies();
      this.resetForm();
    }
  }

  public onEditSubmit(): void {
    if (this.articleForm.valid && this._selectedMovieId) {
      const formValue = this.articleForm.value;
      const movieToUpdate = this.articleService.getMovieById(this._selectedMovieId);

      if (movieToUpdate) {
        const updatedMovie: MoviePost = {
          ...movieToUpdate,
          name: formValue.name,
          focus: formValue.focus,
          content: formValue.content,
          photo: formValue.photo,
          updateTime: new Date().toLocaleString()
        };

        this.articleService.putMovie(updatedMovie);
        this.loadMovies();
        this.resetForm();
      }
    }
  }
  //刪除文章
  public onDeleteSelected(movieId: number): void {
    if (confirm('確定要刪除這篇文章嗎？')) {
      this.articleService.deleteMovie(movieId);
      this.loadMovies();
    }
  }
}
