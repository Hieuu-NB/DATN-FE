import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../../store/app.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
declare var bootstrap: any;
// import * as bootstrap from 'bootstrap'; // Import Bootstrap JS
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  listCourse: any;

  courseFinancial: any[] = [];
  courseDataScience: any[] = [];
  courseMarketing: any[] = [];
  courseDevelopment: any[] = []; 
  courseBusiness: any[] = [];





  userRoles: string[] = []; // Mảng chứa các role của user
  constructor(
      private renderer: Renderer2, 
      private el: ElementRef,
      private appservice: AppService,
      private fb: FormBuilder,
      private router:Router,
      private authService: AuthService
    ) { }
  ngOnInit(): void { 
    this.userRoles = this.authService.getUserRoles();

    this.listCourse = this.appservice.loadAllCourse().subscribe(
      (data) => {
        this.listCourse = data;
        console.log("listCourse :"+this.listCourse.status);
        console.log("listCourse :"+this.listCourse.message);
        console.log("listCourse :"+this.listCourse.data[0].content);

   
        if (this.listCourse.status == 200) {
          for (const element of this.listCourse.data) {
            if (element.content == "Financial") {
              this.courseFinancial.push(element);
            }
            if (element.content == "Data Science") {
              this.courseDataScience.push(element);
            }
            if (element.content == "Marketing") {
              this.courseMarketing.push(element);
            }
            if (element.content == "Development") {
              this.courseDevelopment.push(element);
            }
            if (element.content == "Business") {
              this.courseBusiness.push(element);
            }
          }
        }

        console.log(this.courseFinancial);

      }
    );
    
    console.log('User Roles:', this.userRoles); // Kiểm tra log user roles
  }


  ngAfterViewInit() { // Xử lý modal
    const modals = document.querySelectorAll('.modal');
     // code này để khi click ra ngoài modal thì sẽ tự đóng modal nhưng chưa hoàn thiện
    modals.forEach((modal) => {
      modal.addEventListener('hidden.bs.modal', () => {
        const video = modal.querySelector('video') as HTMLVideoElement;
        if (video) {
          this.closeVideo(video.id);
        }
      });
    });
  }


  closeVideo(videoId: string) {
    const video = document.getElementById(videoId) as HTMLVideoElement;
    if (video) {
        // Lưu lại source hiện tại để tải lại sau
        const currentSrc = video.src;

        // Dừng video và reset thời gian
        video.pause();
        video.currentTime = 0;

        // Load lại video để đảm bảo nó reset hoàn toàn
        video.load();

        // Đóng modal
        const modal = video.closest('.modal');
        if (modal) {
            // Chuyển focus ra ngoài modal để tránh lỗi aria-hidden
            (document.activeElement as HTMLElement)?.blur();

            // Kiểm tra và đóng modal
            const bsModal = bootstrap.Modal.getInstance(modal) || new bootstrap.Modal(modal);
            bsModal.hide();
        }
    }
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
  
}
