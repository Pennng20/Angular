import { Injectable } from '@angular/core';
import { MoviePost } from '../interface/moviepost';
import { MovieData } from '../interface/movie-data';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  /**
   * @private 將savekey定義為字串 作為localStorage中的key
   * @type {string} 字串
   */
  private savekey: string = 'movieData';
  private movieData: MoviePost[] = MovieData;

  /**
   * 檢查瀏覽器是否已存在電影數據，如果有則解析數據賦值給movieData
   */
  constructor() {
    const saveMovies = localStorage.getItem(this.savekey);
    if (saveMovies) {
      this.movieData = JSON.parse(saveMovies);
    }
  }
  /**
   * @returns 淺拷貝，返回所有電影清單
   * addMovie 新增電影清單
   */
  public getMovies(): MoviePost[] {
    return [...this.movieData];
  }

  public addMovie(newMovie: MoviePost): void {
    this.movieData.push(newMovie);
    localStorage.setItem(this.savekey, JSON.stringify(this.movieData));
  }
}
