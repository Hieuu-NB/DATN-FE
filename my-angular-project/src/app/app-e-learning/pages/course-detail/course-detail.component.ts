import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../store/app.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import Swal from 'sweetalert2';
import { NotiBuyCourse, UserCourseName } from '../../store/models/user.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {

  info= 'info@gmail.com';

  courseName: string = '';

  listCourse: any;

  userName: string = ''; // Tên của user

  userRoles: string[] = []; // Mảng chứa các role của user

  // UserCourseName: any;
  userCourseName = new UserCourseName();


  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2, 
    private el: ElementRef,
    private appservice: AppService,
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService
  ) {}

  noti: NotiBuyCourse = new NotiBuyCourse();

  ngOnInit() {
    this.userRoles = this.authService.getUserRoles(); // Lấy role của user từ token
    this.userName = this.authService.getUserName();  // Lấy tên của user từ token
    
    if(this.userRoles.length < 0){
      this.router.navigate(['sign-in']);
    }

    this.route.queryParams.subscribe(params => {
      this.courseName = params['courseName']; // Lấy giá trị courseName
      console.log('Course Name:', this.courseName);
    });
    this.listCourse = this.appservice.loadCourseByName(this.courseName).subscribe(
      (data) => {
        this.listCourse = data;
        console.log("listCourse price :"+this.listCourse.data.price);
      }
    );

    this.noti.courseName = this.courseName;
    this.noti.userName = this.userName;
    this.appservice.notiBuyCourse(this.noti).subscribe(
      (data) => {
        
        console.log(data);
      }
    );
  }



  payment( price: any) {

    console.log(price);
    // Nếu giá khóa học = 0 thì thêm khóa học vào danh sách khóa học của người dùng( mua luôn khóa học)
    // và chuyển hướng đến trang home
    if(this.listCourse.data.price === 0 || this.listCourse.data.price === '0' || this.listCourse.data.price === null){
    
      this.userCourseName.username = this.userName;
      this.userCourseName.course_name = this.courseName;
      this.appservice.addCourseForUser(this.userCourseName).subscribe(
      (data) => {
        console.log(data);
        
        if(data.status === 200){        
            Swal.fire({
              icon: 'success',
              title: 'Mua khóa học thành công!',
              text: 'Chào mừng bạn đến với khóa học !',
              confirmButtonText: 'Tiếp tục',
            });
            this.router.navigate(['home']);
          }else{
            Swal.fire({
              icon: 'info',
              title: data.message,
              text: 'Vui lòng thử lại sau!',
              confirmButtonText: 'Tiếp tục',
            });
            this.router.navigate(['home']);
          }

    });
  }
  // nếu khóa học có giá > 0 thì chuyển hướng đến trang thanh toán
  // và gửi thông tin khóa học và tên người dùng đến trang thanh toán
    else if(this.listCourse.data.price > 0 || this.listCourse.data.price > '0' || this.listCourse.data.price !== null){
      this.userCourseName.username = this.userName;
      this.userCourseName.course_name = this.courseName;

      // Call api thanh toán
      // Chuyển hướng đến trang thanh toán
      this.router.navigate(['payment'], { queryParams: { courseName: this.courseName, price: this.listCourse.data.price } });      
    }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Mua khóa học thất bại!',
      text: 'Vui lòng thử lại sau!',
      confirmButtonText: 'Tiếp tục',
    });
    this.router.navigate(['payment']);
  }
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
