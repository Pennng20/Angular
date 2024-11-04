import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePost } from '../moviepost';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movielocation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movielocation.component.html',
  styleUrl: './movielocation.component.scss'
})

export class MovielocationComponent {
  @Input() moviePost: MoviePost = {
    id: 0,
    name: '',
    focus: '',
    author: '',
    photo: '',
    updateTime: '',
    content: ''
  };
}
