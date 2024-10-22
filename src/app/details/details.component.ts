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
  route: ActivatedRoute = inject(ActivatedRoute);
  movieService = inject(MovieService);
  moviedetails: Moviepost = {
    id: 0,
    name: '',
    focus: '',
    author: '',
    photo: '',
    updated: '',
    content: ''
  };

  constructor() {
    const getMovielocationId = Number(this.route.snapshot.params['id']);
    console.log(getMovielocationId)
    this.movieService.getMoviepostId(getMovielocationId).then(response => {
      this.moviedetails = response;
      console.log(response)
    })
  }
}

