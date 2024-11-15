import { Component, inject } from '@angular/core';
import { LoginService } from '../service/login.service';
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
  private _loginForm: FormGroup;
  private _loginError: boolean = false;
  private _userName: string = '';
  private _welcomeMessage: boolean = false;
  private loginService: LoginService = inject(LoginService);
  public router: Router = inject(Router);
  public loginError$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get loginForm(): FormGroup {
    return this._loginForm;
  }

  public get loginError(): boolean {
    return this._loginError;
  }

  public get username(): string {
    return this._userName;
  }

  public get welcomeMessage(): boolean {
    return this._welcomeMessage;
  }
  /**
   * @param fb 創建表單的服務，可快速創建 FormGroup、FormControl、驗證邏輯。創建表單_loginForm。
   */
  constructor(private fb: FormBuilder) {
    this._loginForm = this.createLoginForm();
  }
  /**
  * @createLoginForm 返回FormGroup的類型，初始化與驗證規則。
  * @onClickLoginBtn this.loginForm.valid 返回一個布林值，表示表單的所有欄位是否通過了驗證
  * @onClickLogoutBtn 調用loginService.logout() 登出邏輯
  * @next Subject 和 BehaviorSubject 提供用來發送新值的API。
  * @Validators 表單驗證
  */
  private createLoginForm(): FormGroup {
    return this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public onClickLoginBtn(): void {
    if (this.loginForm.valid) {
      //表單驗證
      const { password, email } = this.loginForm.value;
      //調用login方法
      const success = this.loginService.login(password, email);
      if (success) {
        this.loginError$.next(false);
        this._welcomeMessage = true;
        this.router.navigate(['/']);
      } else {
        this.loginError$.next(true);
      }
    } else {
      this.loginError$.next(true);
    }
  }

  public onClickLogoutBtn(): void {
    this.loginService.logout();
    this._userName = '';
    this._welcomeMessage = false;
  }
}
