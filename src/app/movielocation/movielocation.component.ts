import { Component, Input } from '@angular/core';
import { Moviepost } from '../moviepost';

@Component({
  selector: 'app-movielocation',
  standalone: true,
  imports: [],
  templateUrl: './movielocation.component.html',
  styleUrl: './movielocation.component.scss'
})
export class MovielocationComponent {
  @Input() moviepost: Moviepost = {
    id: 0,
    name: '',
    focus: '',
    author: '',
    photo: '',
    updated: ''
  };
}
