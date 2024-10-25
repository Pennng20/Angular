import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Moviepost } from '../moviepost';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  /**
   * @public 允許任何程式碼使用。
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   */
  public movieService = inject(MovieService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private _movieDetails: Moviepost = {
    id: 0,
    name: '',
    focus: '',
    author: '',
    photo: '',
    updated: '',
    content: ''
  };

  /**
   * @get 獲取數據
   * @set 接收的值必須是一個Moviepost的類型
   */
  get movieDetails(): Moviepost {
    return this._movieDetails;
  }
  set movieDetails(value: Moviepost) {
    this._movieDetails = value;
  }
  /**
   * 把變數轉換成數字，getMoviepostId方法帶入參數，.then回傳值給movieDetails
   */
  constructor() {
    const getMovielocationId:number = Number(this.route.snapshot.params['id']);
    this.movieService.getMoviepostId(getMovielocationId).then(movieId => {
      this.movieDetails = movieId;
    })
  }
}

