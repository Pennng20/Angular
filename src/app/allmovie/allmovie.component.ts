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
  items = 25;
  page = 1;
  pageSize = 10;
  movielist: Moviepost[] = [];
  movieservice: MovieService = inject(MovieService);
  moviesearch: Moviepost[] = [];

  ngOnInit(): void {
    this.movieservice.getMoviepost().then((movielist: Moviepost[]) => {
      this.movielist = movielist;
      this.moviesearch = movielist;
    });
  }

  SearchResults(text: string) {
    if (!text) {
      this.moviesearch = this.movielist;
      return;
    }

    this.moviesearch = this.movielist.filter(
      Moviepost => Moviepost.name.includes(text)
    );

    console.log(this.moviesearch)
  }
}
