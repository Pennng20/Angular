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
  movielist: Moviepost[] = [];
  movieservice: MovieService = inject(MovieService);

  ngOnInit(): void {
    this.movieservice.getMoviepost().then((movieList: Moviepost[]) => {
      this.movielist = movieList;
    });
  }
}
