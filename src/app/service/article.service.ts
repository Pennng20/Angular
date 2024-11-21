import { Injectable, inject } from '@angular/core';
import { MoviePost } from '../interface/moviepost';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  /**
   * @private 將savekey定義為字串 作為localStorage中的key
   * @type {string} 字串
   */
  private savekey: string = 'movieData';
  private movieData: MoviePost[] = [];
  private router: Router = inject(Router);
  private loginService: LoginService = inject(LoginService);

  /**
   * 檢查瀏覽器是否已存在電影數據，如果有則解析數據賦值給movieData
   */
  constructor() {
    const saveMovies = localStorage.getItem(this.savekey);
    if (saveMovies) {
      this.movieData = JSON.parse(saveMovies);
    };
    localStorage.setItem(this.savekey, JSON.stringify(this.movieData));
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
    const user = this.loginService.userSubject.value;
    if (user) {
      newMovie.author = user.username;
      newMovie.userId = user.id;
      this.movieData.push(newMovie);
      this.saveToLocalStorage();
      alert('新增成功');
      this.router.navigate(['/']);
    }
  }

  //修改
  public putMovie(updatedMovie: MoviePost): void {
    const user = this.loginService.userSubject.value;

    const movieIndex = this.movieData.findIndex(movie => movie.id === updatedMovie.id);
    if (movieIndex === -1) {
      alert('找不到該文章');
      return;
    }

    const movie = this.movieData[movieIndex];
    if (movie.userId === user.id) {
      this.movieData.splice(movieIndex, 1, updatedMovie);  // 先刪除該索引的電影，再插入新的 updatedMovie
      this.saveToLocalStorage();
      alert('修改成功');
      this.router.navigate(['/']);
    } else {
      alert('您無權修改此文章');
    }
  }


  //刪除
  public deleteMovie(id: number): void {
    const user = this.loginService.userSubject.value;

    const movie = this.movieData.find(movie => movie.id === id);
    if (movie?.userId === user.id) {
      this.movieData = this.movieData.filter(movie => movie.id !== id);
      this.saveToLocalStorage();
    } else {
      alert('您無權刪除此文章');
    }
  }

  // 保存到 localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem(this.savekey, JSON.stringify(this.movieData));
  }
}
