import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app-e-learning/store/app.service';
import { AuthService } from 'src/app/core/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-detail-popup',
  templateUrl: './course-detail-popup.component.html',
  styleUrls: ['./course-detail-popup.component.css']  // Thêm dòng này
})
export class CourseDetailPopupComponent implements OnInit {

  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user
  @Input() course: any;
  @Input() listLesson: any[] = [];
  @Output() closePopupEvent = new EventEmitter<void>();
  @Output() approve = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();
  
  @ViewChild('mainVideo') mainVideo!: ElementRef<HTMLVideoElement>;
  constructor(
      private cdRef: ChangeDetectorRef,
      private modalService: NgbModal,
       private renderer: Renderer2, 
            private el: ElementRef,
            private appservice: AppService,
            private fb: FormBuilder,
            private router:Router,
            private authService: AuthService,
            private sanitizer: DomSanitizer
    ) {
      this.userRoles = this.authService.getUserRoles(); // Lấy role của user từ token
      this.userName = this.authService.getUserName();  // Lấy tên của user từ token
     }
  currentVideo: any;

  lectures: any[] = [];

  selectedLecture: any ; // Bài giảng được chọn
  isLoading = false; // Trạng thái loading
  ngOnInit() {
    console.log("course :", this.course);
    this.currentVideo = this.listLesson[0].videoUrl.replace(/ /g, '%20');
  }



  changeVideo(video: any, videoElement: HTMLVideoElement) {
    this.currentVideo = video.videoUrl;

    console.log("video: ", video.videoUrl);
    videoElement.load();
    if (this.mainVideo) {
      this.mainVideo.nativeElement.src = video.url;
      this.mainVideo.nativeElement.load();
      this.mainVideo.nativeElement.play();
    }
  }

  close() {
    this.closePopupEvent.emit();
  }


  
  onApprove() {
    // this.approve.emit();
    // call api APPROVE
    this.isLoading = true; 

          this.appservice.approveCourseByAdmin(this.course.course_name).subscribe((data) => {
            if(data.status === 200){
              Swal.fire({
                icon: 'success',
                title: 'Duyệt khóa học thành công!',
                text: data.message,
                confirmButtonText: 'Tiếp tục',
              });
              this.isLoading = false; 
              this.router.navigate(['admin']);
            }else{
              Swal.fire({
                icon: 'info',
                title: data.message,
                text: 'Vui lòng thử lại sau!',
                confirmButtonText: 'Tiếp tục',
              });
              this.isLoading = false; 
              this.router.navigate(['admin']);
            }
            
          });
          this.closePopupEvent.emit();
  }

  onReject() {
    this.isLoading = true; 

    // this.reject.emit();
    // call api REJECT
          this.appservice.rejectCourseByAdmin(this.course.course_name).subscribe((data) => {
            if(data.status === 200){
              Swal.fire({
                icon: 'success',
                title: 'Từ chối học thành công!',
                text: data.message,
                confirmButtonText: 'Tiếp tục',
              });
              this.isLoading = false; 
              this.router.navigate(['admin']);
            }else{
              Swal.fire({
                icon: 'info',
                title: data.message,
                text: 'Vui lòng thử lại sau!',
                confirmButtonText: 'Tiếp tục',
              });
              this.isLoading = false; 
              this.router.navigate(['admin']);
            }
            
          });
          this.closePopupEvent.emit();

  }
}
