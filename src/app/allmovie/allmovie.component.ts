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
  private static readonly ITEMS_PAGE = 25;
  private static readonly PAGE = 1;
  private static readonly PAGE_SIZE = 10;

  private _movieList: Moviepost[] = [];
  private movieService: MovieService = inject(MovieService);
  private _movieSearch: Moviepost[] = [];

  page = AllmovieComponent.PAGE;

  get items() {
    return AllmovieComponent.ITEMS_PAGE;
  }

  get pageSize() {
    return AllmovieComponent.PAGE_SIZE;
  }

  get movieList(): Moviepost[] {
    return this._movieList;
  }

  set movieList(value: Moviepost[]) {
    this._movieList = value;
  }

  get movieSearch(): Moviepost[] {
    return this._movieSearch;
  }

  set movieSearch(value: Moviepost[]) {
    this._movieSearch = value;
  }

  ngOnInit(): void {
    this.movieService.getMoviepost().then((movielist: Moviepost[]) => {
      this.movieList = movielist;
      this.movieSearch = movielist;
    });
  }

  SearchResults(text: string) {
    if (!text) {
      this.movieSearch = this.movieList;
      return;
    }

    this.movieSearch = this.movieList.filter(
      Moviepost => Moviepost.name.includes(text)
    );
  }
}
