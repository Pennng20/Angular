import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

/**
 * 定義一個路由守門員
 * @param route 接收路由作為參數
 * @param state 接收狀態作為參數
 * @returns
 */
export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // 檢查是否已登入
  const userData = localStorage.getItem('user');
  // 如果有資料，true，否則false
  const isLoggedIn = Boolean(userData);

  // 如果是登入頁面，且已登入，則導向首頁
  if (state.url === '/login' && isLoggedIn) {
    alert('您已登入，無法訪問登入頁面');
    router.navigate(['/']);
    return false;
  }
  return true;
};
