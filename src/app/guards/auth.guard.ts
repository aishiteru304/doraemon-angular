import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Sử dụng `inject` để lấy `Router`

  const isLoggedIn = !!sessionStorage.getItem("accessToken"); // Kiểm tra token

  if (isLoggedIn) {
    router.navigate(['/']); // Chuyển hướng đến trang home
    return false; // Ngăn truy cập trang login
  }

  return true; // Cho phép truy cập nếu chưa đăng nhập
};
