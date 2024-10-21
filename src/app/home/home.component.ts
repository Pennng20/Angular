import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovielocationComponent } from '../movielocation/movielocation.component';
import { MovieService } from '../movie.service';
import { Moviepost } from '../moviepost';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovielocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movielist: Moviepost[] = [];
  movieservice: MovieService = inject(MovieService);

  ngOnInit(): void {
    this.movieservice.getMoviepost().then((housingList: Moviepost[]) => {
      this.movielist = housingList;
    });
  }
}
