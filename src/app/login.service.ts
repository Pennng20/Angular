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

  public login(username: string, password: string, email: string): boolean {
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password && u.email === email
    );
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  public getUser(): any {
    return this.userSubject.value;
  }

  public isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }
}
