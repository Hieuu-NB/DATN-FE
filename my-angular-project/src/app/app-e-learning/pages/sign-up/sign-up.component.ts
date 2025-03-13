import { Component, OnInit } from '@angular/core';
import { AppService } from '../../store/app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { UserRegister } from '../../store/models/user.model';
import Swal from 'sweetalert2/dist/sweetalert2.js'; // ESM, tối ưu hóa

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  user = new UserRegister(); // Khởi tạo một user mới

  signUpForm = new FormGroup({ // Khởi tạo form login
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    phone: new FormControl('')
  });

  constructor( private appservice: AppService,
      private fb: FormBuilder,
      private router:Router,
      private authService: AuthService) { 
      }

  ngOnInit(): void {
  }


  signUp(){
    this.router.navigate(['sign-up']);
  }
  signIn(){
    this.router.navigate(['sign-in']);
  }

  register(){
    console.log(this.signUpForm.value);

    this.user.username = this.signUpForm.get('username')?.getRawValue();
    this.user.password = this.signUpForm.get('password')?.getRawValue();
    this.user.email = this.signUpForm.get('email')?.getRawValue();
    this.user.phone = this.signUpForm.get('phone')?.getRawValue();
    this.user.role = this.signUpForm.get('role')?.getRawValue();

    console.log(this.signUpForm);

    if (this.user.email == '' || this.user.username == '' || this.user.password == '' || this.user.phone == '' || this.user.role == '') {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Vui lòng nhập đủ thông tin !',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.appservice.register(this.user).subscribe(data => {

      console.log(data);
      if(data.status == 200){
        // alert('Đăng ký thành công');
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          text: 'Chào mừng bạn đến với hệ thống!',
          confirmButtonText: 'Tiếp tục',
        });
        this.router.navigate(['sign-in']);
      }else{
        alert(data.message);

        Swal.fire({
          icon: 'success',
          title: data.message,
          text: 'Chào mừng bạn đến với hệ thống!',
          confirmButtonText: 'Tiếp tục',
        });
      }
    });
  }

}
