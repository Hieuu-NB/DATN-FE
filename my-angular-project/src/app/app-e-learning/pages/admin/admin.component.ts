import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../../store/app.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { User, UserEdit, UserRegister } from '../../store/models/user.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/core/auth.guard';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { waitForAsync } from '@angular/core/testing';
declare var bootstrap: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  response: any;
  listUsers: any[] = [];
  listCourseFromDB: any[] = [];

  signUpForm = new FormGroup({ // Khởi tạo form login
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      phone: new FormControl('')
    });
  

  page: number = 1; // Trang mặc định là 1


  currentPageUsers = 1;   // Phân trang cho bảng Users
  currentPageCourses = 1; // Phân trang cho bảng Courses
  currentPageCoursesUploaded = 1; // Phân trang cho bảng Courses



  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user
  selectedUser: any;
  userEdit= new UserEdit();

  courses = [
    { id: 1, status: 'PENDING' },
    { id: 2, status: 'APPROVE' },
    { id: 3, status: 'REJECT' }
  ];

  getStatusClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'APPROVE':
        return 'approve';
      case 'PENDING':
        return 'pending';
      case 'REJECT':
        return 'reject';
      default:
        return '';
    }
  }
  isLoading = false; // Trạng thái loading


  changeStatus(course: any): void {
    console.log(123213);
    
    this.isLoading = true; // Bắt đầu loading
    if (course.status === 'APPROVE') {
      console.log(course.course_name+"APPROVE");
      
      // call api APPROVE
      this.appservice.approveCourseByAdmin(course.course_name).subscribe((data) => {
        if(data.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Duyệt khóa học thành công!',
            text: data.message,
            confirmButtonText: 'Tiếp tục',
          });
          this.isLoading = false; 
          // this.router.navigate(['admin']);
        }else{
          Swal.fire({
            icon: 'info',
            title: data.message,
            text: 'Vui lòng thử lại sau!',
            confirmButtonText: 'Tiếp tục',
          });
          this.isLoading = false; 
          // this.router.navigate(['admin']);
        }
        
      });

    }
    if (course.status === 'REJECT') {
      console.log(course.course_name+"REJECT");

      // call api REJECT
      this.appservice.rejectCourseByAdmin(course.course_name).subscribe((data) => {
        if(data.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Duyệt khóa học thành công!',
            text: data.message,
            confirmButtonText: 'Tiếp tục',
          });
          this.isLoading = false; 
          // this.router.navigate(['admin']);
        }else{
          Swal.fire({
            icon: 'info',
            title: data.message,
            text: 'Vui lòng thử lại sau!',
            confirmButtonText: 'Tiếp tục',
          });
          this.isLoading = false; 
          // this.router.navigate(['admin']);
        }
        
      });

    }
    if (course.status === 'PENDING') {
      console.log(course.course_name+"PENDING");

      // call api PENDING
      this.appservice.pendingCourseByAdmin(course.course_name).subscribe((data) => {
        if(data.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Duyệt khóa học thành công!',
            text: data.message,
            confirmButtonText: 'Tiếp tục',
          });
          this.isLoading = false; 
          // this.router.navigate(['admin']);
        }else{
          Swal.fire({
            icon: 'info',
            title: data.message,
            text: 'Vui lòng thử lại sau!',
            confirmButtonText: 'Tiếp tục',
          });
          this.isLoading = false; 
          // this.router.navigate(['admin']);
        }
        
      });

    }
    console.log('Status changed:', course.status);
    console.log('Course:', course.course_name);
    
    // Có thể gọi API để cập nhật status trên server nếu cần
  }

  

  roles = ['Student', 'Teacher', 'Admin'];
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



  ngOnInit(): void {
    this.response = this.appservice.loadAllUsersAndCourse().subscribe(    // Lấy danh sách user 
      (data) => {
        this.response = data.data;
        console.log("data.data:"+data.data);
        
        for (let index = 0; index < this.response.length; index++) {
          const element = this.response[index];
          // this.listUsers.push(element);
          this.listUsers.push(element);

        }
        console.log(this.listUsers);
        this.cdRef.detectChanges(); 
      }
    );         
         
    


    // load all courses
    this.appservice.loadAllCourseUpload().subscribe(
      (data) => {

        this.listCourseFromDB = data.data;
        //???????
        console.log("listCourse 1:"+ this.listCourseFromDB.length );        
        console.log("listCourse 1:"+ data.length );        
      }
    );
  }


  selectedUserCourses: any[] = [];
  listCourse: any[] = [];

  user = new UserRegister(); // Khởi tạo một user mới

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
          this.signUpForm = new FormGroup({ // Khởi tạo form login
            username: new FormControl(''),
            email: new FormControl(''),
            password: new FormControl(''),
            role: new FormControl(''),
            phone: new FormControl('')
          });
          //
          this.router.navigate(['admin']);

          this.modalService.dismissAll();
          this.listUsers = [];
          this.response = this.appservice.loadAllUsersAndCourse().subscribe(    // Lấy danh sách user 
            (data) => {
              this.response = data.data;
              
              for (let index = 0; index < this.response.length; index++) {
                const element = this.response[index];
                this.listUsers.push(element);
              }
              console.log(this.listUsers);
              this.cdRef.detectChanges(); 
            }
          );  
        }else{
          alert(data.message);
  
          Swal.fire({
            icon: 'error',
            title: data.message,
            text: 'Đã xảy ra lỗi, vui lòng thử lại sau!',
            confirmButtonText: 'Tiếp tục',
          });
        }
      });
    }

    // closeModal() {
    //   if (this.activeModal) {
    //     this.activeModal.dismiss();
    //   }
    // }
  addUsersModal(addUserModal: any) {
    // this.router.navigate(['add-user']);
    this.modalService.open(addUserModal, { centered: true });
  }

  openCoursesOfUserModal(user: any, modalRef: TemplateRef<any>) {
    this.selectedUserCourses = user.courseNames; // Gán danh sách khóa học
    for (let index = 0; index < this.selectedUserCourses.length; index++) {
      if (this.selectedUserCourses[index] == null) {
        this.listCourse = [];
        return
      }
      const element = this.selectedUserCourses[index].courseName;
      this.listCourse.push(element);
    }


    console.log("user.courseNames"+user.courseNames[0].courseName);
    
    // this.modalService.open(modalRef, { size: 'lg', centered: true });


    const modalInstance: NgbModalRef = this.modalService.open(modalRef, { fullscreen: 'xl', centered: true });
    
    modalInstance.result
      .then(() => console.log('Modal đã đóng'))
      .catch(() =>{console.log('Modal đã tắt');
        this.listCourse=[];

        
      } );
  }


  openCoursesDetailModal(user: any, modalRef: TemplateRef<any>) {
    // this.selectedUserCourses = user.courseNames; // Gán danh sách khóa học
    // for (let index = 0; index < this.selectedUserCourses.length; index++) {
    //   if (this.selectedUserCourses[index] == null) {
    //     this.listCourse = [];
    //     return
    //   }
    //   const element = this.selectedUserCourses[index].courseName;
    //   this.listCourse.push(element);
    // }


    // console.log("user.courseNames"+user.courseNames[0].courseName);
    
    // this.modalService.open(modalRef, { size: 'lg', centered: true });


    const modalInstance: NgbModalRef = this.modalService.open(modalRef, { size: 'lg', centered: true });
    
    modalInstance.result
      .then(() => console.log('Modal đã đóng'))
      .catch(() =>{console.log('Modal đã tắt');
        this.listCourse=[];
      } );
  }
  
  

  deleteCourse(course: any) {
    console.log(course);
    
    // Xóa khóa học trong danh sách tạm
    // this.selectedUserCourses.splice(index, 1);
    
    // Log ra danh sách còn lại sau khi xóa
    console.log('Khóa học sau khi xóa:', this.selectedUserCourses);
  }

  onPageChangeUser(pageNumber: number): void {
    this.currentPageUsers = pageNumber; // Cập nhật trang hiện tại
    // this.page = event; // Cập nhật giá trị trang
  }

  onPageChangeCourse(pageNumber: number): void {
    this.currentPageCourses = pageNumber; // Cập nhật trang hiện tại
    // this.page = event; // Cập nhật giá trị trang
  }

  onPageChangeCourseUploaded(pageNumber: number): void {
    this.currentPageCoursesUploaded = pageNumber; // Cập nhật trang hiện tại
    // this.page = event; // Cập nhật giá trị trang
  }
  
  openEditModal(user: any, content: any) {
    this.selectedUser = { ...user };
    this.modalService.open(content, { centered: true, size: 'lg' });
  } 
  
  openDeleteModal(user: any, deleteModal: any) {
    this.selectedUser = user;
    this.modalService.open(deleteModal, { centered: true });
  }

  deleteUser() {
    const deletedUser = { ...this.selectedUser }; // Sao chép dữ liệu user trước khi xóa

    this.listUsers = this.listUsers.filter(u => u.id !== this.selectedUser.id);
    
    // // api xoa user
    this.appservice.deleteUser(deletedUser.username).subscribe((data) => {
      
      if(data.status === 200){        
                  Swal.fire({
                    icon: 'success',
                    title: 'Xóa user thành công!',
                    text: data.message,
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
                  this.router.navigate(['home']);
                }
      console.log(data);
    });

    console.log('User deleted:', deletedUser); // Log user đã bị xóa
  
    this.modalService.dismissAll();
  }
  

  saveChanges() { // hàm lưu khi click lưu trong edit user
    console.log(213);
    
    const index = this.listUsers.findIndex(u => u.id === this.selectedUser.id);
    if (index !== -1) {
      this.listUsers[index] = { ...this.selectedUser };
      console.log('User after update:', this.listUsers[index]);
      this.userEdit.username = this.listUsers[index].username;
      this.userEdit.avatarUrl = this.listUsers[index].avatarUrl;
      this.userEdit.email = this.listUsers[index].email;
      this.userEdit.phone = this.listUsers[index].phone;
      this.userEdit.role = this.listUsers[index].role;


      console.log('User after update:', this.userEdit);
      
      // api update user
      this.appservice.updateUserByAdmin(this.userEdit).subscribe((data) => {
        if(data.status === 200){
          Swal.fire({
            icon: 'success',
            title: 'Cập nhật user thành công!',
            text: data.message,
            confirmButtonText: 'Tiếp tục',
          });
          this.router.navigate(['admin']);
        }else{
          Swal.fire({
            icon: 'info',
            title: data.message,
            text: 'Vui lòng thử lại sau!',
            confirmButtonText: 'Tiếp tục',
          });
          this.router.navigate(['admin']);
        }
        console.log(data);
      });
    }
    this.modalService.dismissAll();
  }
      


// Thêm các biến và hàm này
showPopup: boolean = false;
selectedCourse1: any;
listLesson: [] = [];
openCourseDetailForApprove(course: any) {


  this.appservice.loadLessonByCourseNameApi(course.course_name).subscribe((data) => {
    this.listLesson = data; // Lấy danh sách bài giảng
    console.log("listLesson:"+this.listLesson);
    this.selectedCourse1 = course;
    this.showPopup = true;
  });

  // this.selectedCourse1 = course;
  // this.showPopup = true;
  // console.log(course);
  
}

closePopup() {
  this.showPopup = false;
}




  // Course
   // Nhận dữ liệu khóa học khi mở modal
   selectedCourse: any;
  selectedVideo: SafeResourceUrl | null = null;
   openCourseModal(course: any) {
    this.selectedCourse = course;
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(course?.videos[0]?.url);
  }

  // Xử lý khi click vào video
  playVideo(video: any) {
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(video.url);
  }







goHome(){
  this.router.navigate(['home']);
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
