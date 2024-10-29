import { Injectable } from "@angular/core";
import { Moviepost } from "./moviepost";

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  private readonly url:string = 'http://localhost:3000/movies';

  /**
   * @async getMoviepost回傳一個Moviepost[]類型的promise
   * @await await等到fetch獲取數據，回傳json格式的資料，如不是正確json格式則回傳[]
   */
  async getMoviePost(): Promise<Moviepost[]> {
    const data:Response = await fetch(this.url);
    return await data.json() ?? [];
  }
  /**
   * @param id 參數，回傳的id要是數字型別的。
   */
  async getMoviePostId(id: Number): Promise<Moviepost> {
    const data:Response  = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {
      id: 1,
      name: '',
      focus: '',
      author: '',
      photo: '',
      updated: '',
      content: ''
    }
  }
}
