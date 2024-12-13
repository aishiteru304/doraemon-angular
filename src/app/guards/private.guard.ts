import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const privateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Sử dụng `inject` để lấy `Router`

  const isLoggedIn = !!sessionStorage.getItem("accessToken"); // Kiểm tra token

  if (!isLoggedIn) {
    router.navigate(['/login']); // Chuyển hướng đến trang login
    return false; // Ngăn truy cập
  }

  return true; // Cho phép truy cập nếu đăng nhập
};
