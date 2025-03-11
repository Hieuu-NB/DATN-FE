import { Component, OnInit } from '@angular/core';
import { AppService } from '../../store/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../store/models/user.model';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // account = new Account();
  user = new User(); // Khởi tạo một user mới
  data: any; // Biến chứa dữ liệu trả về từ server
  userRoles: string[] = []; // Mảng chứa các role của user

  loginForm = new FormGroup({ // Khởi tạo form login
    username: new FormControl(''),
      password: new FormControl(''),
  });
  constructor(
    private appservice: AppService,
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService
  ) { }

  hasRole(role: string): boolean { // Kiểm tra xem user có role đó không
    return this.userRoles.includes(role); 
  }

  isLoggedIn(): boolean {  // Kiểm tra xem user đã đăng nhập chưa
    return this.userRoles.length > 0; // Nếu có ít nhất 1 role thì user đã đăng nhập
  }
  

  ngOnInit(): void { // Hàm này sẽ chạy khi component được khởi tạo
    this.userRoles = this.authService.getUserRoles();

    console.log('User Roles:', this.userRoles); // Kiểm tra log
    this.loginForm =  new FormGroup(
      {
        username: new FormControl(''),
        password: new FormControl('')
      }
    );
  }

  signUp(){ 
    this.router.navigate(['sign-up']);
  }
  signIn(){
    this.router.navigate(['login']);
  }
 
  login_by_user(){ // Hàm này sẽ chạy khi người dùng click vào nút login
    this.user.username = this.loginForm.get('username')?.getRawValue();
    this.user.password = this.loginForm.get('password')?.getRawValue();
    console.log(this.user);
    

    this.appservice.login_by_user(this.user).subscribe({
      next: (w) => {
        this.data = w;
        localStorage.setItem('accessToken', w.data.accessToken);
        console.log(w.data.accessToken);
        
        this.router.navigate(['home']);
      },
      error: (err) => {
        if (err.status === 401) {
          Swal.fire({
            icon: 'warning',
            title: 'Unauthorized!',
            text: 'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: err.error.message || 'Có lỗi xảy ra, vui lòng thử lại sau!',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  }

  logout() {   
    localStorage.removeItem('accessToken');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
