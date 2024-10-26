import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';
import { Moviepost } from '../moviepost';
import { MovielocationComponent } from '../movielocation/movielocation.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-allmovie',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MovielocationComponent, NgbPaginationModule],
  templateUrl: './allmovie.component.html',
  styleUrl: './allmovie.component.scss'
})
export class AllmovieComponent {
  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   * @static 可以直接通過類名來訪問。
   */
  private static readonly ITEMS_PAGE = 25;
  private static readonly PAGE = 1;
  private static readonly PAGE_SIZE = 10;
  /**
   * @private _用來表明這是一個私有屬性。
   * @public 允許任何程式碼使用。
   */
  private _movieList: Moviepost[] = [];
  private _movieSearch: Moviepost[] = [];
  public movieService: MovieService = inject(MovieService);

  public page = AllmovieComponent.PAGE;
  /**
   * @get 透過funtion模擬 呼叫 物件屬性，不能有參數、且要有回傳值。
   * @set 透過funtion模擬 賦值 到物件屬性，只能有一個參數。
   */
  public getPage(): number {
    return this.page;
  }

  public get items():number {
    return AllmovieComponent.ITEMS_PAGE;
  }

  public get pageSize():number {
    return AllmovieComponent.PAGE_SIZE;
  }
  //獲取數據
  public get movieList(): Moviepost[] {
    return this._movieList;
  }
  //接收的值必須是一個Moviepost的陣列
  public set movieList(value: Moviepost[]) {
    this._movieList = value;
  }

  public get movieSearch(): Moviepost[] {
    return this._movieSearch;
  }

  public set movieSearch(value: Moviepost[]) {
    this._movieSearch = value;
  }
  /**
   * 方法調用回傳promise，.then接收回傳的結果
   */
  public ngOnInit(): void {
    this.movieService.getMoviepost().then((movielist: Moviepost[]) => {
      this.movieList = movielist;
      this.movieSearch = movielist;
    });
  }
  /**
   * @includes 用來檢查電影名稱中是否有匹配的文字。
   */
  protected searchResults(text: string) {
    if (!text) {
      this.movieSearch = this.movieList;
      return;
    }

    this.movieSearch = this.movieList.filter(
      Moviepost => Moviepost.name.includes(text)
    );
  }
}
