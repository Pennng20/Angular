import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';
import { Moviepost } from '../moviepost';
import { MovielocationComponent } from '../movielocation/movielocation.component';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-allmovie',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MovielocationComponent, NgbPaginationModule, NgbCarouselModule],
  templateUrl: './allmovie.component.html',
  styleUrl: './allmovie.component.scss'
})
export class AllmovieComponent {
  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   * @static 不需要創建實例(let myCar = new Car();) 可以直接通過類名來訪問。
   * @readonly 初始化後不能被修改。通常在構造函數中賦值，賦值後不能再次修改。適合用來定義不應該被意外修改的屬性。
   * @memberof AllmovieComponent 電影組件
   */

  private static readonly ITEMS_PAGE = 25;
  private static readonly PAGE = 1;
  private static readonly PAGE_SIZE = 10;

  private _movieList: Moviepost[] = [];
  private _movieSearch: Moviepost[] = [];
  private movieService: MovieService = inject(MovieService);
  private router: Router = inject(Router);
  private _currentPage = 1; //當前頁碼

  /**
   * @get 不能有參數、且要有回傳值。
   * @set 賦值到物件屬性，只能有一個參數。
   * @type {string[]} 返回的類型要是物件陣列
   */

  private _page: number = AllmovieComponent.PAGE;

  public get page(): number {
    return this._page;
  }

  private set page(value: number) {
    this._page = value;
    this.scrollToTop();
  }

  public get items(): number {
    return AllmovieComponent.ITEMS_PAGE;
  }

  public get pageSize(): number {
    return AllmovieComponent.PAGE_SIZE;
  }

  private get movieList(): Moviepost[] {
    return this._movieList;
  }

  private set movieList(value: Moviepost[]) {
    this._movieList = value;
  }

  public get movieSearch(): Moviepost[] {
    return this._movieSearch;
  }

  private set movieSearch(value: Moviepost[]) {
    this._movieSearch = value;
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  /**
   * 方法調用回傳promise，.then接收回傳的結果
   * void 表示getMoviepost方法不會返回任何東西。
   */
  public ngOnInit(): void {
    this.movieService.getMoviePost().then((movielist: Moviepost[]) => {
      this.movieList = movielist;
      this.movieSearch = movielist;
    });
  }
  /**
   * 用來檢查電影名稱中是否有匹配的文字。
   * @param text 電影名稱
   */
  public searchResults(text: string) {
    if (!text) {
      this.movieSearch = this.movieList;
      return;
    }

    this.movieSearch = this.movieList.filter(
      Moviepost => Moviepost.name.includes(text)
    );

    if (this.movieSearch.length === 0) {
      alert('搜尋沒有結果，請重新搜尋。');
      this.movieSearch = this.movieList;

      setTimeout(() => {
        this.router.navigate(['/allmovie']);
      }, 0);
    }
  }
  /**void 表示onPageChange方法不會返回任何東西。
   * 更新currentPage為新的頁碼
   * @newPage 參數為數字型別，賦值給currentPage。
   */
  public onPageChange(newPage: number): void {
    this._currentPage = newPage;
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0 });
  }
}

