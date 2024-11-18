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

  public getMovieById(id: number): MoviePost | undefined {
    return this.movieData.find(movie => movie.id === id);
  }

  //新增
  public addMovie(newMovie: MoviePost): void {
    this.movieData.push(newMovie);
    localStorage.setItem(this.savekey, JSON.stringify(this.movieData));
  }

  //修改
  public putMovie(updatedMovie: MoviePost): void {
    const index = this.movieData.findIndex(movie => movie.id === updatedMovie.id);

    if (index !== -1) {
      this.movieData.splice(index, 1, updatedMovie);  // 在找到的索引處移除1個元素，插入新的updatedMovie
      this.saveToLocalStorage();
    } else {
      console.error('Movie not found');
    }
  }

  //刪除
  public deleteMovie(id: number): void {
    const index = this.movieData.findIndex(movie => movie.id === id);

    if (index !== -1) {
      this.movieData.splice(index, 1);
      this.saveToLocalStorage();
    } else {
      console.error('Movie not found');
    }
  }

  // 保存到 localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem(this.savekey, JSON.stringify(this.movieData));
  }
}
