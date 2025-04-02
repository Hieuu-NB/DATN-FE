import { Component, OnInit } from '@angular/core';
import { AppService } from '../../store/app.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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

  // signUpForm = new FormGroup({ // Khởi tạo form login
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   role: new FormControl(''),
  //   phone: new FormControl('')
  // });
  signUpForm!: FormGroup;


  constructor( private appservice: AppService,
      private fb: FormBuilder,
      private router:Router,
      private authService: AuthService) { 
      }

   ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Địa chỉ email hợp lệ
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10,11}$') // Số điện thoại chỉ chứa 10-11 số
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$') // Chứa chữ hoa, chữ thường, số
      ]),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });

    // Thêm validate cho confirmPassword
    this.signUpForm.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this)
    ]);
  }

  // Kiểm tra confirmPassword có khớp với password không
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { mismatch: true };
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
    
    if (this.signUpForm.get('username')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi đăng ký!',
        text: 'Vui lòng nhập tên người dùng hợp lệ!',
        confirmButtonText: 'Thử lại',
      });
      return;
    }
    
    if (this.signUpForm.get('email')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi đăng ký!',
        text: 'Vui lòng nhập email hợp lệ!',
        confirmButtonText: 'Thử lại',
      });
      return;
    }
    
    if (this.signUpForm.get('phone')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi đăng ký!',
        text: 'Vui lòng nhập số điện thoại hợp lệ!',
        confirmButtonText: 'Thử lại',
      });
      return;
    }
    
    if (this.signUpForm.get('password')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi đăng ký!',
        text: 'Mật khẩu phải chứa chữ hoa, chữ thường và ít nhất 8 ký tự!',
        confirmButtonText: 'Thử lại',
      });
      return;
    }
    
    if (this.signUpForm.get('role')?.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi đăng ký!',
        text: 'Vui lòng chọn vai trò (Teacher hoặc Student)!',
        confirmButtonText: 'Thử lại',
      });
      return;
    }




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
        console.log("Đăng ký thành công");

        // alert('Đăng ký thành công');
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          text: 'Chào mừng bạn đến với hệ thống!',
          confirmButtonText: 'Tiếp tục',
        });
        this.router.navigate(['sign-in']);
      }else{
        console.log("Lỗi đăng ký");
        
        alert(data.message);

        Swal.fire({
          icon: 'success',
          title: data.message,
          text: 'Có lỗi xảy ra, thử lại sau ít phút',
          confirmButtonText: 'Tiếp tục',
        });
      }
    });

    this.appservice.sendEmailRegisterSuccess(this.user.email).subscribe(data => {
      console.log(data);
      
    })
  }

}
