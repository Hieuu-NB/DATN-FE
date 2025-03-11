import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[]; // Lấy roles từ route
    if (this.authService.hasRole(requiredRoles)) {
      return true;
    } else {
      // Nếu không có quyền, điều hướng về trang không được phép truy cập
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
