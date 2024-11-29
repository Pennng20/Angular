import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserData } from "../mockdata/user-data";
import { TempUserData } from "../interface/userdata";


@Injectable({
  providedIn: 'root',
})

export class LoginService {
  /**
   * @private 變數userSubject要是BehaviorSubject類別
   * @user$ 是一個 Observable，可以被外部組件或服務訂閱，當 userSubject 的值改變時，它會自動通知所有訂閱者。
   */
  public userSubject$ = new BehaviorSubject<TempUserData>({ id: 0, username: '', picture: '' });
  public userObserver = this.userSubject$.asObservable();

  /**
   * @localStorage.getItem('user') 會返回存儲在 localStorage 中為 'user' 的值
   * JSON.stringify() 將物件轉換為字符。
   * JSON.parse() 將字符轉換回物件。
   * next() 將用戶的資料發送出去，所有訂閱userSubject的地方都會收到更新的用戶信息。
   */
  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject$.next(JSON.parse(user));
    }
  }
  /**
   * (userInfo)函數的參數，它代表 mockUsers 陣列中的每一個元素。
   * @param password 使用者密碼
   * @param email 信箱
   * @returns true登入成功，false登錄失敗。
   */
  public login(password: string, email: string): boolean {
    //在userData裡面找是否有符合的密碼和信箱
    const user = UserData.find(
      (userInfo) => userInfo.password === password && userInfo.email === email
    );
    // 如果有資料則存在localstorage裡
    if (user) {
      const userData = {
        id: user.id,
        username: user.username,
        picture: user.picture
      }
      localStorage.setItem('user', JSON.stringify(userData));
      // userSubject$.next() 更新目前登入的使用者狀態
      this.userSubject$.next(userData);
      // 登入成功
      return true;
    } else {
      // 登入失敗
      return false;
    }
  }
  //登出、清除資料
  public logout(): void {
    // 清除localstorage裡的資料
    localStorage.removeItem('user');
    this.userSubject$.next({ id: 0, username: '', picture: '' });
  }
}
