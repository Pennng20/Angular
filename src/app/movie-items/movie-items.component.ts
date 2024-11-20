import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePost } from '../interface/moviepost';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movielocation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-items.component.html',
  styleUrl: './movie-items.component.scss'
})

export class MovieItemsComponent {
  @Input() moviePost: MoviePost = {
    id: 0,
    name: '',
    focus: '',
    author: '',
    userId: 0,
    photo: '',
    updateTime: '',
    content: ''
  };
}
