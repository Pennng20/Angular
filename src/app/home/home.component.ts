import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovielocationComponent } from '../movielocation/movielocation.component';
import { MovieService } from '../movie.service';
import { Moviepost } from '../moviepost';
import { RouterOutlet, RouterModule } from '@angular/router';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MovielocationComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  //設為私有層級
  private _movieList: Moviepost[] = [];
  private movieService: MovieService = inject(MovieService);

  get movieList(): Moviepost[] {
    return this._movieList;
  }

  set movieList(value: Moviepost[]) {
    this._movieList = value;
  }

  ngOnInit(): void {
    this.movieService.getMoviepost().then((movieList: Moviepost[]) => {
      this.movieList = movieList; // 使用存取子來設置值
    });
  }
}
