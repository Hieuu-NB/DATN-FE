import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../../store/app.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { UserName } from '../../store/models/user.model';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
})
export class MyCourseComponent implements OnInit {

  info = 'info@gmail.com';
  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user
  listCourse: any;

  myCourses: any[] = [];
  name = new UserName(); 

  constructor(
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


    this.name.username = this.userName;
    this.listCourse = this.appservice.loadMyCourseByUserName(this.name).subscribe(
      (data) => {
        this.listCourse = data;
        this.myCourses = this.listCourse.data;
        // console.log("listCourse :"+this.listCourse[0].content);
       
      }
    );
  }
  
  openAdmin() { // Chuyển hướng đến trang admin
    this.router.navigate(['admin']);
  }
  
  openLearning(){
    this.router.navigate(['course-learning']);
  }


  viewProfile() { // Chuyển hướng đến trang profile
    this.router.navigate(['profile']);
  }
  editProfile() { // Chuyển hướng đến trang edit profile
    this.router.navigate(['edit-profile']);
  }
  myCourse() { // Chuyển hướng đến trang my course
    this.router.navigate(['my-course']);
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
