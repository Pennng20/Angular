import { Component} from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  private _showPassword: boolean = false;

  public get loginForm(): FormGroup {
    return this._loginForm;
  }

  public get loginError(): boolean {
    return this._loginError;
  }

  public set loginError(value: boolean) {
    this._loginError = value;
  }

  public get userName(): string {
    return this._userName;
  }

  public set userName(value: string) {
    this._userName = value;
  }

  public get showPassword(): boolean {
    return this._showPassword;
  }

  /**
   * @param fb 創建表單的服務，可快速創建 FormGroup、FormControl、驗證邏輯。創建表單_loginForm。
   */
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
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

  public onSubmitLoginBtn(): void {
    if (this.loginForm.valid) {
      // 表單驗證
      const password = this.loginForm.value.password;
      const email = this.loginForm.value.email;
      // 調用login方法
      const success: boolean = this.loginService.login(password, email);
      if (success) {
        this.loginError = false;
        this.router.navigate(['/']);
      } else {
        this.loginError = true;
      }
    } else {
      this.loginError = true;
    }
  }

  public onClickLogoutBtn(): void {
    this.loginService.logout();
  }

  public onClickEyeBtn() {
    this._showPassword = !this.showPassword;
  }
}
