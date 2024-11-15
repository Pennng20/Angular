import { ArticleService } from './../service/article.service';
import { Component, inject } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviePost } from '../interface/moviepost';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-article-management',
  standalone: true,
  imports: [ReactiveFormsModule, NgbNavModule],
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
  private articleService: ArticleService = inject(ArticleService);
  private loginService: LoginService = inject(LoginService);

  public get active(): number {
    return this._active;
  }

  public get articleForm(): FormGroup {
    return this._articleForm;
  }

  public get movies(): MoviePost[] {
    return this._movies;
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

  public onSubmit(): void {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;

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
      console.log('New Movie:', newMovie);
      //將新增的電影加到articleService中
      this.articleService.addMovie(newMovie);
      console.log('Updated Movies List:', this.articleService.getMovies());

      //將新增的清單賦值給movies
      this._movies = [...this.articleService.getMovies()]

      //清空表單
      this.articleForm.reset();
    }
  }
}


