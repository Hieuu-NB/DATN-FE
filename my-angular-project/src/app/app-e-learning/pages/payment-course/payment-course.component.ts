import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../store/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { NotiBuyCourse, PaymentCourse, UserCourseName } from '../../store/models/user.model';
import Swal from 'sweetalert2';

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
  vnp_TxnRef: string | null = null;
  encodedCourseName: any;
  courseNamePaymentDone: any;
  paymentInfo: PaymentCourse = new PaymentCourse();
  url_payment: string = '';

  userCourseName = new UserCourseName();
  noti: NotiBuyCourse = new NotiBuyCourse();
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

      // param trả về sau khi click vào chi tiết khóa học
      this.courseName = params['courseName'];
      this.price = params['price'];


      // param trả về sau khi thanh toán xong
      this.paymentStatus = params['status'];
      this.vnp_TxnRef = params['vnp_TxnRef']; 
      this.encodedCourseName = params['courseNamePaymentDone']; 

      const courseNamePaymentDone = decodeURIComponent(this.encodedCourseName || '');

      if (this.paymentStatus === "paymentDone") {
        this.courseNamePaymentDone = courseNamePaymentDone;
        
      }

      console.log("courseNamePaymentDone"+courseNamePaymentDone); // "Khóa học lập trình cơ bản"
    });
    if (this.paymentStatus==="paymentDone") {
      this.stepPayment=3;
      console.log(this.courseName);
      // call api thay đổi status payyment thành processed

      this.appservice.updatePaymentStatusCourse(this.vnp_TxnRef).subscribe({
        next: (response) => {

          this.userCourseName.username = this.userName;
          this.userCourseName.course_name = this.courseNamePaymentDone;


          console.log("call api thêm khóa học cho user :"+this.userCourseName.course_name);
          console.log("call api thêm khóa học cho user :"+this.userCourseName.username);
          // call api sent email mua khóa học thành công 
          this.noti.courseName = this.courseNamePaymentDone;
          this.noti.userName = this.userName;
          this.appservice.sendEmailPaymentSuccess(this.noti).subscribe( // Gửi thông báo đến user khi mua khóa học thành công
            (data) => {
              console.log(data);
            }
          );
          this.appservice.addCourseForUser(this.userCourseName).subscribe( // thêm khóa học cho user
                (data) => {
                  console.log(data);
                  
                  if(data.status === 200){        
                      Swal.fire({
                        icon: 'success',
                        title: 'Mua khóa học thành công!',
                        text: 'Chào mừng bạn đến với khóa học !',
                        confirmButtonText: 'Tiếp tục',
                      });
                      // this.router.navigate(['home']);
                    }else{
                      Swal.fire({
                        icon: 'info',
                        title: data.message,
                        text: 'Vui lòng thử lại sau!',
                        confirmButtonText: 'Tiếp tục',
                      });
                      // this.router.navigate(['home']);
                    }
          
              });

          console.log('Cập nhật trạng thái thanh toán thành công:', response);
        },
        error: (error) => {
          console.error('Lỗi khi cập nhật trạng thái thanh toán:', error);
        }
      });

      // cần gọi api thêm khóa học cho user sau khi payment xong - ok  
      // và api thêm tiền cho teacher 
      // api push kafka để gửi email noti đăng kí khóa học thành công - ok
    }


    this.paymentForm = this.fb.group({ // Tạo form thanh toán
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
          const url = new URL(response.data.paymentUrl);
          const txnRef = url.searchParams.get("vnp_TxnRef");
          this.url_payment = response.data.paymentUrl;
          // Gọi API để lưu thông tin thanh toán vào cơ sở dữ liệu nhưng chưa hoàn thành
          this.paymentInfo.courseName = this.courseName;
          this.paymentInfo.customerName = this.paymentForm.value.customerName;
          this.paymentInfo.userName = this.userName;
          this.paymentInfo.phoneNumber = this.paymentForm.value.phoneNumber;
          this.paymentInfo.email = this.paymentForm.value.email;
          this.paymentInfo.paymentMethod = this.paymentForm.value.paymentMethod;
          this.paymentInfo.vnp_txn_ref = txnRef;
          this.paymentInfo.price = this.price;
          this.paymentInfo.payment_status = 'PROCESSING'; //processed nếu thành đã xong
          this.appservice.savePaymentInfo(this.paymentInfo).subscribe({
            next: (response) => {
              console.log('Lưu thông tin thanh toán thành công:', response);
              window.location.href = this.url_payment; // Điều hướng trực tiếp
            },
            error: (error) => {
              console.error('Lỗi khi lưu thông tin thanh toán:', error);
            }
          });
          // Gọi API để lưu thông tin thanh toán vào cơ sở dữ liệu


         



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
