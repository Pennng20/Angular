import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { MovieService } from '../movie.service';
import { Moviepost } from '../moviepost';
import { MovielocationComponent } from '../movielocation/movielocation.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-allmovie',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, BannerComponent, MovielocationComponent, NgbPaginationModule],
  templateUrl: './allmovie.component.html',
  styleUrl: './allmovie.component.scss'
})
export class AllmovieComponent {
  items = 20;
  page = 1;
  pageSize = 10;
  movielist: Moviepost[] = [];
  movieservice: MovieService = inject(MovieService);

  ngOnInit(): void {
    this.movieservice.getMoviepost().then((movieList: Moviepost[]) => {
      this.movielist = movieList;
    });
  }
}
