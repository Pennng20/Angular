import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovielocationComponent } from '../movielocation/movielocation.component';
import { MovieService } from '../movie.service';
import { Moviepost } from '../moviepost';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MovielocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /**
   * @public 允許任何程式碼使用。
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   * movieList變數要是Moviepost[]的類型，初始化為[]
   */
  private _movieList: Moviepost[] = [];
  public movieService: MovieService = inject(MovieService);

  /**
   * @get 獲取數據
   * @set 接收的值必須是一個Moviepost的陣列
   */
  get movieList(): Moviepost[] {
    return this._movieList;
  }

  set movieList(value: Moviepost[]) {
    this._movieList = value;
  }
  /**
   * getMoviepost方法回傳promise，.then接收回傳的值是Moviepost[]類型並賦值
   */
  ngOnInit(): void {
    this.movieService.getMoviepost().then((movieList: Moviepost[]) => {
      this.movieList = movieList;
    });
  }
}
