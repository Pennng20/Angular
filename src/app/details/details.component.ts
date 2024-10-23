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
  private route: ActivatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private _movieDetails: Moviepost = {
    id: 0,
    name: '',
    focus: '',
    author: '',
    photo: '',
    updated: '',
    content: ''
  };

  get movieDetails(): Moviepost {
    return this._movieDetails;
  }

  set movieDetails(value: Moviepost) {
    this._movieDetails = value;
  }

  constructor() {
    const getMovielocationId = Number(this.route.snapshot.params['id']);
    this.movieService.getMoviepostId(getMovielocationId).then(response => {
      this.movieDetails = response;
    })
  }
}

