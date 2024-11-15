import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { MoviePost } from '../interface/moviepost';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  /**
   * @private 只能在該類別的內部被訪問，外部無法直接存取。
   * @memberof DetailsComponent 內頁組件
   */
  private movieService = inject(MovieService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);
  private router: Router = inject(Router);
  private _currentId: number = 0;
  private _movieDetails: MoviePost = {
    id: 0,
    name: '',
    focus: '',
    author: '',
    photo: '',
    updateTime: '',
    content: ''
  };
  /**
   * @type {Moviepost} 返回Moviepost的類型
   */
  public get movieDetails(): MoviePost {
    return this._movieDetails;
  }
  private set movieDetails(value: MoviePost) {
    this._movieDetails = value;
  }
  public get currentId(): number {
    return this._currentId;
  }
  private set currentId(value: number) {
    this._currentId = value;
  }
  /**
   * 把變數轉換成數字，getMoviepostId方法帶入參數，.then回傳值給movieDetails。
   * setTitle()是Title服務提供的一個方法，用於設置當前頁面的標題。
   * 調用setTitle方法，會更新瀏覽器標籤中的標題。
   * previousPage會返回上一篇文章
   */
  public ngOnInit() {
    const getMovieId: number = Number(this.route.snapshot.params['id']);
    this.currentId = getMovieId;
    this.getMoviePostById(getMovieId);
  }

  private getMoviePostById(getMovieId: number) {
    this.movieService.getMoviePostId(getMovieId).then(movieId => {
      this.movieDetails = movieId;
      this.titleService.setTitle(movieId.name);
    }).catch(error => {
      console.error(error);
      this.router.navigate(['/pagenotfound']);
    });
  }

  public previousPageBtn() {
    this.currentId = this.currentId - 1;
    this.router.navigate([`/details/${this.currentId}`]).then(() => {
      window.scrollTo(0, 0);
      this.getMoviePostById(this.currentId); //重新加載當前資料
    });
  }
}
