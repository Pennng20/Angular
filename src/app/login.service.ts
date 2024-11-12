import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { mockUsers } from "./mock-data";

@Injectable({
  providedIn: 'root',
})

export class LogInService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
  //登入
  login(username: string, password: string, email: string) {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password && u.email === email
    );
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return true;
    }else{
      return false;
    }
  }
  //登出
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUser(){
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }
}
