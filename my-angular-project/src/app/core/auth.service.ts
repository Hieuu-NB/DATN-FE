import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // Lấy token từ localStorage
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Giải mã token và lấy thông tin user
  getUserRoles(): string[] {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.roles || []; // Giả sử backend trả về roles trong token
      } catch (error) {
        console.error('Invalid token:', error);
        return [];
      }
    }
    return [];
  }

  getUserName(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.sub || 'Người dùng'; // Lấy giá trị từ "sub"
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    return 'Người dùng';
  }
  
  

  // Kiểm tra quyền truy cập
  hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return requiredRoles.some(role => userRoles.includes(role));
  }

  // Đăng xuất (xóa token)
  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/sign-in']);
  }
}
