import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../store/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-payment-course',
  templateUrl: './payment-course.component.html',
  styleUrls: ['./payment-course.component.css']
})
export class PaymentCourseComponent implements OnInit {
  userName: string = ''; // Tên của user
  info= 'info@gmail.com';
  userRoles: string[] = []; // Mảng chứa các role của user
  courseName: string = '';
  price: number = 0;
  stepPayment :number = 1;
  paymentForm!: FormGroup;
  vnpayUrl: any;
  paymentStatus: string | null = null;
  vnp_Amount: string | null = null;
  vnp_BankCode: string | null = null;
  constructor(
    private route: ActivatedRoute,
        private renderer: Renderer2, 
        private el: ElementRef,
        private appservice: AppService,
        private fb: FormBuilder,
        private router:Router,
        private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles(); // Lấy role của user từ token
    this.userName = this.authService.getUserName();  // Lấy tên của user từ token

    this.route.queryParams.subscribe(params => {
      this.courseName = params['courseName'];
      this.price = params['price'];

      this.paymentStatus = params['status'];
      this.vnp_Amount = params['vnp_Amount'];
      this.vnp_BankCode = params['vnp_BankCode'];
      console.log("Payment status:"+ this.paymentStatus);
      console.log("vnp_Amount :" + this.vnp_Amount);
      console.log("vnp_BankCode :" + this.vnp_BankCode);
      
    });
    if (this.paymentStatus==="paymentDone") {
      this.stepPayment=3;
      console.log(this.courseName);
      // cần gọi api thêm khóa học cho user sau khi payment xong 
      // và api thêm tiền cho teacher 
      // api push kafka để gửi email noti đăng kí khóa học thành công 
    }


    this.paymentForm = this.fb.group({
      customerName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      paymentMethod: ['vnpay', Validators.required] // Mặc định chọn VNPay
    });

    console.log("courseName :" + this.courseName);
    console.log("price :" + this.price);
    
  }


  // Hàm chọn phương thức thanh toán
  selectPaymentMethod(method: string) {
    this.paymentForm.patchValue({ paymentMethod: method });

  }

  // Submit form
  proceedToPayment() {
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);
      this.appservice.payWithVNPay(this.price, 'NCB').subscribe({
        next: (response) => {
          console.log('Thanh toán thành công:', response.data.paymentUrl);
          window.location.href = response.data.paymentUrl; // Điều hướng trực tiếp
        },
        error: (error) => {
          console.error('Lỗi khi thanh toán:', error);
        }
      });
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }




























































openAboutUs() { // Mở modal about us
this.router.navigate(['about-us']);
}

openListAuthor() { // Mở modal about us
this.router.navigate(['list-author']);
}

myCourse() { // Chuyển hướng đến trang my course
  this.router.navigate(['my-course']);
}

openTeacherPage() { // Chuyển hướng đến trang teacher page
  this.router.navigate(['teacher-page']);
}

openAdmin() { // Chuyển hướng đến trang admin
  this.router.navigate(['admin']);
}
  
  viewProfile() { // Chuyển hướng đến trang profile
    this.router.navigate(['profile']);
  }
  editProfile() { // Chuyển hướng đến trang edit profile
    this.router.navigate(['edit-profile']);
  }

  isLoggedIn(): boolean {  // Kiểm tra xem user đã đăng nhập chưa
    return this.userRoles.length <= 0; // Nếu có ít nhất 1 role thì user đã đăng nhập
  }

  hasRole(role: string): boolean { // Kiểm tra xem user có role đó không
    return this.userRoles.includes(role); 
  }

  signUp(){ // Chuyển hướng đến trang đăng ký
    this.router.navigate(['sign-up']);
  }
  signIn(){ // Chuyển hướng đến trang đăng nhập
    this.router.navigate(['sign-in']);
  }
  logout(){ // Đăng xuất
    this.authService.logout();
  }
}
