import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../../store/app.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
interface Lecture {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  avatarLesson: string;
  byCourse : string;

}

interface Comment {
  id: number;
  user: string;
  content: string;
  date: string;
}

interface Resource {
  id: number;
  name: string;
  type: string;
  url: string;
}

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html'
})
export class LearningComponent implements OnInit {

  constructor(
    private renderer: Renderer2, 
          private el: ElementRef,
          private appservice: AppService,
          private fb: FormBuilder,
          private router:Router,
          private authService: AuthService,
          private route: ActivatedRoute
  ) { }

  lectures: any[] = [];
  selectedLecture: any ; // Bài giảng được chọn
  courseName: any;
  ngOnInit(): void {
    this.userName = this.authService.getUserName();  // Lấy tên của user từ token
    this.route.queryParams.subscribe(params => {
      this.courseName = params['courseName'];
      if (this.courseName) {
        // this.loadCourse(this.courseId); // Call API

        this.appservice.loadLessonByCourseNameApi(this.courseName).subscribe((data: any) => {  

          this.lectures = data;
    
          this.selectedLecture = this.lectures[0];
          
          console.log(this.lectures[0].videoUrl);
          
        }
        );
      }
    });
    



  }
activeTab: string = 'content'; // Tab mặc định là 'content'
  // Hàm chuyển đổi tab
  switchTab(tab: string): void {
    this.activeTab = tab;
  }

  // Fake data
 // lectures: Lecture[] = []; // Danh sách bài giảng
  //   {
  //     id: 1,
  //     title: 'Bài giảng 1: Giới thiệu Angular',
  //     description: 'Tìm hiểu về Angular và cách xây dựng ứng dụng web hiện đại.',
  //     videoUrl: 'https://s3-bucket-by-hieu.s3.ap-southeast-2.amazonaws.com/Angular/lesson/20250321_1459566274960786770.mp4',
  //     duration: '10:00'
  //   },
  //   {
  //     id: 2,
  //     title: 'Bài giảng 2: Components trong Angular',
  //     description: 'Học cách tạo và sử dụng components trong Angular.',
  //     videoUrl: 'https://s3-bucket-by-hieu.s3.ap-southeast-2.amazonaws.com/MSA/lesson/20250321_1413116274960777280.mp4',
  //     duration: '15:00'
  //   },
  //   {
  //     id: 3,
  //     title: 'Bài giảng 3: Data Binding',
  //     description: 'Khám phá cách binding dữ liệu trong Angular.',
  //     videoUrl: 'https://s3-bucket-by-hieu.s3.ap-southeast-2.amazonaws.com/V%C4%83n%20h%E1%BB%8Dc/lesson/20250322_0003116274960786770.mp4',
  //     duration: '12:00'
  //   }
  // ];


  // Hàm chọn bài giảng

  // Hàm chọn bài giảng
  selectLecture(lecture: Lecture, event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    this.selectedLecture = lecture;
    console.log('Bài giảng được chọn:', this.selectedLecture.title); // Kiểm tra dữ liệu
    
  }








myCourse() { // Chuyển hướng đến trang my course
  this.router.navigate(['my-course']);
}


openAdmin() { // Chuyển hướng đến trang admin
  this.router.navigate(['admin']);
}


viewProfile() { // Chuyển hướng đến trang profile
  this.router.navigate(['qr-code']);
}
editProfile() { // Chuyển hướng đến trang edit profile
  this.router.navigate(['edit-profile']);
}

  // // Hàm chọn tab
  // selectTab(tab: string): void {
  //   this.activeTab = tab;
  // }
  hoHome() { // Chuyển hướng đến trang home
    this.router.navigate(['home']);
  }
  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user


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
