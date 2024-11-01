import { Injectable } from "@angular/core";
import { Moviepost } from "./moviepost";

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private readonly url: string = 'http://localhost:3000/movies';
  /**
   * @returns 回傳一個Moviepost[]類型的promise
   */
  public async getMoviePost(): Promise<Moviepost[]> {
    const data: Response = await fetch(this.url);
    return await data.json() ?? [];
  }
  /**
   * @param id 參數，回傳的id要是數字型別的。
   */
  public async getMoviePostId(id: number): Promise<Moviepost> {
    const data: Response = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {
      id: 0,
      name: '',
      focus: '',
      author: '',
      photo: '',
      updateTime: '',
      content: ''
    }
  }
}
