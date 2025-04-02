import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../../store/app.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
interface Author {
  name: string;
  bio: string;
  avatar: string;
  title: string;
  stats: { value: string | number; label: string }[];
  socialLinks: { name: string; url: string; icon: string }[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  avatarCourseUrl: string;
  price: number;
  students: number;
  rating: number;
  course_name: any;
}


@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user


  
  author: Author = {
    name: 'Nguyễn Văn A',
    title: 'Giảng viên Lập trình Fullstack',
    bio: 'Giảng viên với hơn 5 năm kinh nghiệm trong lĩnh vực lập trình và thiết kế web. Chuyên gia về JavaScript, React và Node.js.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    stats: [
      { value: 25, label: 'Khóa học' },
      { value: '10,000+', label: 'Học viên' },
      { value: 4.9, label: 'Đánh giá' }
    ],
    socialLinks: [
      { name: 'Facebook', url: '#', icon: 'fab fa-facebook' },
      { name: 'YouTube', url: '#', icon: 'fab fa-youtube' },
      { name: 'GitHub', url: '#', icon: 'fab fa-github' },
      { name: 'Website', url: '#', icon: 'fas fa-globe' }
    ]
  };

  courses: Course[] = [];
  nameAuthor: string = '';
  isLoading = true;
    constructor(
      private route: ActivatedRoute,
      private renderer: Renderer2, 
      private el: ElementRef,
      private appservice: AppService,
      private fb: FormBuilder,
      private router:Router,
      private authService: AuthService
    ) {}
  
  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles(); // Lấy role của user từ token
    this.userName = this.authService.getUserName();  // Lấy tên của user từ token

    this.route.queryParams.subscribe(params => {
      this.nameAuthor = params['nameAuthor']; // Lấy giá trị courseName
      console.log('Course Name:', this.nameAuthor);
    });



// "id": 5,
//             "course_name": "MVC-1",
//             "author": "tien",
//             "title": "khóa học dành cho người mới bắt đầu",
//             "description": null,
//             "avatarCourseUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI55HMtRyNz_-3HD21odeQjICEzYTUGuRfoZnbOV30_Jzl4_yTj2NTdCAWQIILPJpJkW4&usqp=CAU",
//             "urlS3": "https://s3-bucket-by-hieu.s3.ap-southeast-2.amazonaws.com/Angular/Video-demo/6274960761510.mp4",
//             "price": "0",
//             "content": "Financial",
//             "status": "APPROVE"
    // Simulate API call




    setTimeout(() => {


      this.appservice.listCourseUploadByTeacher(this.nameAuthor).subscribe(
        (data) => {
          // this.courses = data.data;
          this.courses = data.data.filter((course: any) => course!= null && course.status != null &&course.status === 'APPROVE');
          console.log('Courses:', this.courses);
          
        }
      );

      // this.courses = [
      //   {
      //     id: 1,
      //     title: 'Lập trình JavaScript từ Zero đến Hero',
      //     description: 'Khóa học toàn diện về JavaScript hiện đại, bao gồm ES6+, DOM, Async/Await và các dự án thực tế.',
      //     avatarCourseUrl: 'https://img-c.udemycdn.com/course/480x270/1441546_17f9_2.jpg',
      //     price: 499000,
      //     students: 2345,
      //     rating: 4.8
      //   },
      //   {
      //     id: 2,
      //     title: 'React.js - Xây dựng ứng dụng thực tế',
      //     description: 'Học React qua các dự án thực tế, bao gồm Redux, Hooks, Context API và tích hợp Firebase.',
      //     avatarCourseUrl: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
      //     price: 599000,
      //     students: 1876,
      //     rating: 4.9
      //   },
      //   {
      //     id: 3,
      //     title: 'Node.js & Express - Backend Mastery',
      //     description: 'Xây dựng RESTful APIs với Node.js, Express và MongoDB. Học cách triển khai ứng dụng lên Heroku.',
      //     avatarCourseUrl: 'https://img-c.udemycdn.com/course/480x270/1463348_52a4_2.jpg',
      //     price: 649000,
      //     students: 1542,
      //     rating: 4.7
      //   },
      //   {
      //     id: 4,
      //     title: 'Thiết kế UI/UX cơ bản cho Developer',
      //     description: 'Khóa học giúp developer hiểu nguyên tắc thiết kế để tạo ứng dụng đẹp và thân thiện người dùng.',
      //     avatarCourseUrl: 'https://img-c.udemycdn.com/course/480x270/1576854_9aeb_2.jpg',
      //     price: 399000,
      //     students: 987,
      //     rating: 4.5
      //   }
      // ];
      this.isLoading = false;
    }, 1000);
  }

  viewCourseDetail(courseName: any): void {
    console.log('Viewing course detail:', courseName);
    this.router.navigate(['course-detail'], { queryParams: { courseName } });
    // Trong ứng dụng thực tế, bạn có thể điều hướng đến trang chi tiết:
    // this.router.navigate(['/courses', courseId]);
  }






























  viewAuthorDetail(nameAuthor: any): void {
    // this.router.navigate(['about-us']);
    this.router.navigate(['author-detail'], { queryParams: { nameAuthor } });
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


openAdmin() { // Chuyển hướng đến trang admin
  this.router.navigate(['admin']);
}
openTeacherPage() { // Chuyển hướng đến trang teacher page
  this.router.navigate(['teacher-page']);
}


viewProfile() { // Chuyển hướng đến trang profile
  this.router.navigate(['qr-code']);
}
editProfile() { // Chuyển hướng đến trang edit profile
  this.router.navigate(['edit-profile']);
}


openCourseDetail(courseName: string) {  
  this.router.navigate(['course-detail'], { queryParams: { courseName } });
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
