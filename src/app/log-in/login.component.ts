import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  /**
   * @private 設置為私人
   * @type {FormGroup} loginForm返回的類型
   * @memberof LoginComponent 登入邏輯
   * @BehaviorSubject  loginError$ $結尾表示這是一個Observable(可觀察的非同步結果)物件
   *                   loginError$是BehaviorSubject<boolean>的型別，初始值為false
   */
  private _loginForm!: FormGroup;
  private _loginError: boolean = false;
  private _username: string = '';
  private _welcomeMessage: boolean = false;
  public loginError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get loginForm(): FormGroup {
    return this._loginForm;
  }

  public get loginError(): boolean {
    return this._loginError;
  }

  public get username(): string {
    return this._username;
  }

  public get welcomeMessage(): boolean {
    return this._welcomeMessage;
  }

  /**
   * @param loginService 注入service服務 登入邏輯
   * @param fb 創建表單的服務，可快速創建 FormGroup、FormControl、驗證邏輯。創建表單_loginForm。
   * @param router 路由導航
   * @Validators 表單驗證
   */
  constructor(
    public loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this._loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  /**
   * @onClickLoginBtn this.loginForm.valid 返回一個布林值，表示表單的所有欄位是否通過了驗證
   * @onClickLogoutBtn 調用loginService.logout() 登出邏輯
   * @next Subject 和 BehaviorSubject 提供用來發送新值的API。
   */
  public onClickLoginBtn(): void {
    if (this.loginForm.valid) {
      //表單驗證
      const { username, password, email } = this.loginForm.value;
      //調用login方法
      const success = this.loginService.login(username, password, email);
      if (success) {
        this.loginError$.next(false);
        this._username = username;
        this._welcomeMessage = true;

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        this.loginError$.next(true);
      }
    } else {
      this.loginError$.next(true);
    }
  }

  public onClickLogoutBtn(): void {
    this.loginService.logout();
    this._username = '';
    this._welcomeMessage = false;
  }
}
