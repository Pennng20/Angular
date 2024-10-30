import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovielocationComponent } from '../movielocation/movielocation.component';
import { MovieService } from '../movie.service';
import { Moviepost } from '../moviepost';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MovielocationComponent, NgbCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private _images: string[] = ['/assets/banner1.jpg', '/assets/banner2.jpg', '/assets/banner3.jpg', '/assets/banner4.jpg'];

  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   * @type {Moviepost[]} movieList變數要是Moviepost[]的類型，初始化為空陣列。
   */
  private _movieList: Moviepost[] = [];
  private movieService: MovieService = inject(MovieService);

  /**
   * @readonly
   * @type {string[]} 返回字串型別
   */
  public get images(): string[] {
    return this._images;
  }

  public get movieList(): Moviepost[] {
    return this._movieList;
  }

  private set movieList(value: Moviepost[]) {
    this._movieList = value;
  }
  /**
   * @getMoviepost 方法回傳promise，.then接收回傳的值是Moviepost[]類型並賦值。
   * void 表示ngOnInit方法不會返回任何東西。
   */
  public ngOnInit(): void {
    this.movieService.getMoviePost().then((movieList: Moviepost[]) => {
      this.movieList = movieList;
    });
  }
}


