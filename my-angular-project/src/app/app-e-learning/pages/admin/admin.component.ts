import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../../store/app.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { User } from '../../store/models/user.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/core/auth.guard';
declare var bootstrap: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  response: any;
  listUsers: any[] = [];

  page: number = 1; // Trang mặc định là 1
  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user
  selectedUser: any;
  roles = ['Student', 'Teacher', 'Admin'];
  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
     private renderer: Renderer2, 
          private el: ElementRef,
          private appservice: AppService,
          private fb: FormBuilder,
          private router:Router,
          private authService: AuthService
  ) {
    this.userRoles = this.authService.getUserRoles(); // Lấy role của user từ token
    this.userName = this.authService.getUserName();  // Lấy tên của user từ token
   }

  ngOnInit(): void {
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
                                    
  }


  selectedUserCourses: any[] = [];
  listCourse: any[] = [];

  openCoursesModal(user: any, modalRef: TemplateRef<any>) {
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


    const modalInstance: NgbModalRef = this.modalService.open(modalRef, { size: 'lg', centered: true });
    modalInstance.result
      .then(() => console.log('Modal đã đóng'))
      .catch(() =>{console.log('Modal đã tắt');
        this.listCourse=[];
      } );
  }

  deleteCourse(course: any) {
    // Xóa khóa học trong danh sách tạm
    // this.selectedUserCourses.splice(index, 1);

    // Log ra danh sách còn lại sau khi xóa
    console.log('Khóa học sau khi xóa:', this.selectedUserCourses);
  }

  onPageChange(pageNumber: number): void {
    this.page = pageNumber; // Cập nhật trang hiện tại
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
    
    console.log('User deleted:', deletedUser); // Log user đã bị xóa
  
    this.modalService.dismissAll();
  }
  

  saveChanges() { // hàm lưu khi click lưu trong edit user
    const index = this.listUsers.findIndex(u => u.id === this.selectedUser.id);
    if (index !== -1) {
      this.listUsers[index] = { ...this.selectedUser };
      console.log('User after update:', this.listUsers[index]);
    }
    
    this.modalService.dismissAll();
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
