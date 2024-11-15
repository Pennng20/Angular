import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserData } from "../interface/user-data";

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  /**
   * @private 變數userSubject要是BehaviorSubject<any>類別 初始值為null
   * @user$ 是一個 Observable，可以被外部組件或服務訂閱，當 userSubject 的值改變時，它會自動通知所有訂閱者。
   */
  public userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  /**
   * @localStorage getItem('user') 會返回存儲在 localStorage 中為 'user' 的值
   * JSON.stringify() 將 JavaScript 對象轉換為 JSON 格式的字符串。
   * JSON.parse() 將 JSON 格式的字符串轉換回 JavaScript 對象。
   * next() 將用戶的資料發送出去，所有訂閱userSubject的地方都會收到更新的用戶信息。
   */
  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
  /**
   * (u)函數的參數，它代表 mockUsers 陣列中的每一個元素。
   * @param password 使用者密碼
   * @param email 信箱
   * @returns true登入成功，false登錄失敗。
   */
  public login(password: string, email: string): boolean {
    const user = UserData.find(
      (u) =>  u.password === password && u.email === email
    );
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return true;
    } else {
      return false;
    }
  }
  //登出、清除資料
  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
  // //獲取資料
  // public getUser(): any {
  //   return this.userSubject.value;
  // }
  // //檢查使用者是否登錄
  // public isLoggedIn(): boolean {
  //   return this.userSubject.value !== null;
  // }
}
