import { Injectable } from '@angular/core';
import { MoviePost } from '../interface/moviepost';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  /**
   * @private 將savekey定義為字串 當localStorage中的唯一key
   * @type {string} 字串
   */
  private readonly savekey: string = '';
  private movieData: MoviePost[] = [];
  /**
   * 檢查瀏覽器是否已存在電影數據，如果有則解析數據賦值給movieData
   */
  constructor(
    private router: Router,
    private loginService: LoginService) {
    this.savekey = 'movieData';
    // 從本地端儲存電影資料
    const saveMovies = localStorage.getItem(this.savekey);
    // 檢查是否成功獲取本地端儲存電影資料，JSON.parse將字串轉為物件
    if (saveMovies) {
      this.movieData = JSON.parse(saveMovies);
    };
    // 確保數據被儲存，JSON.stringify將物件轉為字串
    localStorage.setItem(this.savekey, JSON.stringify(this.movieData));
  }
  /**
   * @returns 淺拷貝 獲取所有電影清單
   * addMovie 新增電影清單
   */
  public getMovies(): MoviePost[] {
    return [...this.movieData];
  }

  public getMovieById(id: number): MoviePost | undefined {
    return this.movieData.find(movie => movie.id === id);
  }

  /**
   * 新增文章
   * @param newMovie 新增的電影
   * 確保ID的惟一值，用Math.max找到最大值並+1，若為空值則返回1
   */
  public addMovie(newMovie: MoviePost): void {
    // 獲取當前用戶登入訊息
    const user = this.loginService.userSubject$.value;
    // 自動帶入文章作者，設定會員唯一id
    newMovie.author = user.username;
    newMovie.userId = user.id;
    // 設定唯一id
    newMovie.id = this.movieData.length > 0 ? Math.max(...this.movieData.map(movie => movie.id)) + 1 : 1;
    // push新增電影到陣列中
    this.movieData.push(newMovie);
    this.saveToLocalStorage();
    alert('新增成功');
    this.router.navigate(['/movielist']);
  }

  /**
   * 修改文章
   * @param updatedMovie 需要修改的電影
   * @returns void無返回值
   */
  public putMovie(updatedMovie: MoviePost): void {
    // 獲取當前用戶登入訊息
    const user = this.loginService.userSubject$.value;
    // 找到要更新的電影
    const movieIndex = this.movieData.findIndex(movie => movie.id === updatedMovie.id);
    // 獲取當前電影文章內容
    const movie = this.movieData[movieIndex];
    // 檢查是否為文章作者
    if (movie.userId === user.id) {
      // 先刪除該索引的電影，再插入新的 updatedMovie
      this.movieData.splice(movieIndex, 1, updatedMovie);
      this.saveToLocalStorage();
      alert('修改成功');
      this.router.navigate(['/movielist']);
    } else {
      alert('您無權修改此文章');
    }
  }

  /**
   * 刪除文章
   * @param id 要刪除的文章id
   */
  public deleteMovie(id: number): void {
    // 獲取當前用戶登入訊息
    const user = this.loginService.userSubject$.value;
    // 找到要刪除的電影
    const movie = this.movieData.find(movie => movie.id === id);
    // 檢查是否為文章作者
    if (movie?.userId === user.id) {
      this.movieData = this.movieData.filter(movie => movie.id !== id);
      this.saveToLocalStorage();
      alert('刪除成功');
    } else {
      alert('您無權刪除此文章');
    }
  }

  /**
   * 保存到 localStorage
   * 將movieData轉換為JSON.stringify字串
   */
  private saveToLocalStorage(): void {
    localStorage.setItem(this.savekey, JSON.stringify(this.movieData));
  }
}
