import { Injectable } from "@angular/core";
import { Moviepost } from "./moviepost";

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  url = 'http://localhost:3000/movies';

  constructor() { }
  async getMoviepost(): Promise<Moviepost[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
  async getMovieId(id: Number): Promise<Moviepost> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {
      id: 0,
      name: '',
      focus: '',
      author: '',
      photo: '',
      updated: '',
      content: ''
    }
  }
}
