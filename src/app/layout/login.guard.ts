import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

export const articleManageGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  // 檢查是否已登入
  const userData = localStorage.getItem('user');
  const isLoggedIn = Boolean(userData);

  // 如果未登入，則導向登入頁面
  if (!isLoggedIn) {
    alert('請先登入才能訪問文章管理頁面');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
