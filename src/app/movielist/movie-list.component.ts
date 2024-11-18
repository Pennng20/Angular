// import { MovieService } from '../service/movie.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePost } from '../interface/moviepost';
import { MovieItemsComponent } from '../movie-items/movie-items.component';
import { RouterModule, Router } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-allmovie',
  standalone: true,
  imports: [RouterModule, CommonModule, MovieItemsComponent, NgbPaginationModule, NgbCarouselModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   * @static 不需要創建實例(let myCar = new Car();) 可以直接通過類名來訪問。
   * @readonly 初始化後不能被修改。通常在構造函數中賦值，賦值後不能再次修改。適合用來定義不應該被意外修改的屬性。
   */

  // private movieService: MovieService = inject(MovieService);
  // private _movieList: MoviePost[] = [];
  private articleService: ArticleService = inject(ArticleService)
  private _movieData: MoviePost[] = [];
  private _movieSearch: MoviePost[] = [];
  private router: Router = inject(Router);
  private _currentPage = 1; //當前頁碼
  private static readonly PAGE_SIZE = 10;

  /**
   * @get 不能有參數、且要有回傳值。
   * @set 賦值到物件屬性，只能有一個參數。
   * @type {string[]} 返回的類型要是物件陣列
   */

  public get pageSize(): number {
    return MovieListComponent.PAGE_SIZE;
  }

  // private get movieList(): MoviePost[] {
  //   return this._movieList;
  // }

  // private set movieList(value: MoviePost[]) {
  //   this._movieList = value;
  // }

  public get movieData(): MoviePost[] {
    return this._movieData;
  }

  private set movieData(value: MoviePost[]) {
    this._movieData = value;
  }

  public get movieSearch(): MoviePost[] {
    return this._movieSearch;
  }

  private set movieSearch(value: MoviePost[]) {
    this._movieSearch = value;
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  private set currentPage(value: number) {
    this._currentPage = value;
    this.scrollToTop();
  }

  /**
   * 方法調用回傳promise，.then接收回傳的結果
   * void 表示getMoviepost方法不會返回任何東西。
   */
  public ngOnInit(): void {
    this._movieData = this.articleService.getMovies();
    this.movieSearch = this._movieData;
  }
  /**
   * 用來檢查電影名稱中是否有匹配的文字。
   * @param text 電影名稱
   */
  public searchBtn(text: string, search: HTMLInputElement) {
    if (!text) {
      this.movieSearch = this.movieData;
      return;
    }

    this.movieSearch = this.movieData.filter(
      Moviepost => Moviepost.name.includes(text)
    );

    if (this.movieSearch.length === 0) {
      alert('搜尋沒有結果，請重新搜尋。');
      this.movieSearch = this._movieData;
      this.router.navigate(['/movielist']);
    }
    search.value = '';
  }
  /**void 表示onPageChange方法不會返回任何東西。
   * 更新currentPage為新的頁碼
   * @newPage 參數為數字型別，賦值給currentPage。
   * scrollToTop換頁時頁面移到最上面
   */
  public onPageChange(newPage: number): void {
    this._currentPage = newPage;
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0 });
  }
}

