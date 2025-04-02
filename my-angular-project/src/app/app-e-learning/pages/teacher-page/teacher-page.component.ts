import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../store/app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { DetailCourse, LoadLessonByCourseNameAndUserName, Reviews } from '../../store/models/user.model';

interface Course {
  id: number;
  name: string;
  description: string;
  category: string;
  level: string;
  demoVideo: File | null;
  lessons: Lesson[];
}

interface Lesson {
  name: string;
  description: string;
  duration: string;
  video: File | null;
}

@Component({
  selector: 'teacher-page',
  templateUrl: './teacher-page.component.html',
})
export class TeacherPageComponent {
  @ViewChild('nameCourse') courseInput!: ElementRef;

  listCourseUploadByTeacher: any[] = [];
  currentPageCourses = 1; // Phân trang cho bảng Courses
  onPageChangeCourse(pageNumber: number): void {
    this.currentPageCourses = pageNumber; // Cập nhật trang hiện tại
    // this.page = event; // Cập nhật giá trị trang
  }

  courseDetail :DetailCourse = new DetailCourse();
  reviews : Reviews = new Reviews();
  


  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
     private renderer: Renderer2, 
          private el: ElementRef,
          private appservice: AppService,
          private fb: FormBuilder,
          private router:Router,
          private authService: AuthService,
          private sanitizer: DomSanitizer,
  ) {
    this.userRoles = this.authService.getUserRoles(); // Lấy role của user từ token
    this.userName = this.authService.getUserName();  // Lấy tên của user từ token
   }
  // courseForm: FormGroup;

  courseForm = new FormGroup({ // Khởi tạo form course                    2
    username: new FormControl(''), // Tên người tạo khóa học
    courseName: new FormControl(''),// Tên khóa học                       1
    title: new FormControl(''),    // Tiêu đề khóa học
    description: new FormControl(''),  // Mô tả khóa học
    avatarCourseUrl: new FormControl(''), // Ảnh đại diện khóa học
    price: new FormControl(''), // Giá khóa học
    content: new FormControl(''), // Nội dung khóa học
    file: new FormControl(''), // File video demo cho khóa học

    timeCourse: new FormControl(''), // Thời lượng khóa học
    lectures: new FormControl(''), // Số bài giảng  
    language: new FormControl(''), // Ngôn ngữ
    certificate: new FormControl(''), // Chứng chỉ

  });

  uploadFormLesson = new FormGroup({ // Khởi tạo form upload lesson
    title: new FormControl(''),
    videoUrl: new FormControl(''),
    description: new FormControl(''),
    orderIndex: new FormControl(''),
    avatarLesson: new FormControl(''),
    byCourse: new FormControl(''),


  });

  ngOnInit(): void {
    this.courseForm = new FormGroup(
      {
        username: new FormControl(''),
        courseName: new FormControl(''),
        title: new FormControl(''),
        description: new FormControl(''),
        avatarCourseUrl: new FormControl(''),
        price: new FormControl(''),
        content: new FormControl(''),
        file: new FormControl(''),
        timeCourse: new FormControl(''),
        lectures: new FormControl(''),
        language: new FormControl(''),
        certificate: new FormControl(''),
      }
    );

    this.uploadFormLesson = new FormGroup(
      {
        title: new FormControl(''),
        videoUrl: new FormControl(''),
        description: new FormControl(''),
        orderIndex: new FormControl(''),
        avatarLesson: new FormControl(''),
        byCourse: new FormControl(''),
      }
    );

    const username = this.authService.getUserName();
    console.log("username :" +username);
    
    this.appservice.listCourseUploadByTeacher(username).subscribe(
      (data) => { 
        this.listCourseUploadByTeacher = data.data;
        console.log("listCourseUploadByTeacher :"+this.listCourseUploadByTeacher[0].course_name);
      }
    );

   this.reviews.rating = 5;
  this.reviews.comment = "Bài giảng"
  }
  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log('Form submitted:', this.courseForm.value);
      // Gửi dữ liệu lên backend tại đây
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }
  
  // Hàm xử lý khi form được submit
  onSubmitLesson(): void {
    if (this.courseForm.valid) {
      console.log('Form submitted:', this.courseForm.value);
      // Gửi dữ liệu lên backend tại đây
    } else {
      alert('Vui lòng điền đầy đủ thông tin.');
    }
  }
  selectedFile: File | null = null; // File được chọn từ input
  selectedFileCourse: File | null = null; // File được chọn từ input
  // Hàm xử lý upload file
  onFileChange(event: any): void { 
    // const file = event.target.files[0];
    // if (file) {
    //   this.courseForm.patchValue({ file: file });
    // }

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  onFileChangeCourse(event: any): void { 
    // const file = event.target.files[0];
    // if (file) {
    //   this.courseForm.patchValue({ file: file });
    // }

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileCourse = input.files[0];
    }
  }

  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user
  input: LoadLessonByCourseNameAndUserName = new LoadLessonByCourseNameAndUserName();
onSearchCourse() { 
// show danh sách các khóa học theo tên bài học dc nhập vào có hiển thị popup thông báo
//  và call api, data sẽ được show ở bên phải màn hình của khóa học đó
    const inputValue = this.courseInput.nativeElement.value;
    console.log('Giá trị nhập:', inputValue);

    console.log(this.userName);
    this.input.courseName = inputValue;
    this.input.userName = this.userName;


    this.appservice.loadLessonByCourseNameAndUserNameApi(this.input).subscribe((data) => {
      if (  data != null  ) {
        console.log('Data:', data);
      this.lessons = data;
      }
      else
      {
        Swal.fire({
          icon: 'info',
          title: 'Không tìm thấy bài học nào của bạn tên là : '+ inputValue,
          text: 'Vui lòng thử lại sau!',
          confirmButtonText: 'OK',
        });
      }
      
    }
    );
}
lessons : any[] = [];
isLoading = false; // Trạng thái loading

uploadLesson() {

  if (!this.uploadFormLesson.valid || !this.selectedFile) {
    Swal.fire({
      icon: 'info',
      title: 'Upload không thành công !',
      text: 'Vui lòng nhập đầy đủ thông tin và chọn file',
      confirmButtonText: 'OK',
    });
    return;
  }
  this.isLoading = true; // Bắt đầu loading

  const title = this.uploadFormLesson.get('title')?.value;
  const description = this.uploadFormLesson.get('description')?.value;
  const avatarLesson = this.uploadFormLesson.get('avatarLesson')?.value;
  const byCourse = this.uploadFormLesson.get('byCourse')?.value;
  const lessonData = {
    title,
    description,
    avatarLesson,
    byCourse
  };
  const formData = new FormData();
  formData.append('file', this.selectedFile);
  formData.append('data', new Blob([JSON.stringify(lessonData)], { type: 'application/json' }));
  
  this.appservice.uploadNewLesson(formData).subscribe({
      next: (response) => {
        if (response.status === 200) {
        this.isLoading = false; // Dừng loading
          Swal.fire({
                      icon: 'success',
                      title: 'Upload thành công !',
                      text: response.message,
                      confirmButtonText: 'OK',
                    });
                    this.uploadFormLesson.reset();
        }
        else{
          this.isLoading = false;
          Swal.fire({
            icon: 'info',
            title: 'Upload không thành công !',
            text: response.message,
            confirmButtonText: 'OK',
          });
          this.uploadFormLesson.reset();
        }
      },

      error: (error) => {
        console.error('Lỗi upload:', error);
        this.isLoading = false; // Dừng loading khi lỗi xảy ra
        this.uploadFormLesson.reset();
        alert('Upload thất bại!');
        this.isLoading = false;
      }
    });
}


review: Reviews = new Reviews();

reviewsList: Reviews[] = [];

test()  {
  
  this.reviewsList.push(this.review);
}



// uploadCourse() {

//   if (!this.courseForm.valid || !this.selectedFileCourse) {
//     Swal.fire({
//       icon: 'info',
//       title: 'Upload không thành công !',
//       text: 'Vui lòng nhập đầy đủ thông tin và chọn file',
//       confirmButtonText: 'OK',
//     });
//     return;
//   }
//   this.isLoading = true; // Bắt đầu loading

//   const courseName = this.courseForm.get('courseName')?.value;
//   const title = this.courseForm.get('title')?.value;
//   const description = this.courseForm.get('tidescriptiontle')?.value;

//   const avatarCourseUrl = this.courseForm.get('avatarCourseUrl')?.value;
//   const price = this.courseForm.get('price')?.value;
//   const content = this.courseForm.get('content')?.value;
//   const username = this.authService.getUserName();
//   console.log("username :" +username);
  
//   const courseData = {
//     course_name: courseName,
//     title,
//     description,
//     avatarCourseUrl,
//     price,
//     content, // phân loại khóa học
//     username
//   };
  
//   const formData = new FormData();
//   formData.append('file', this.selectedFileCourse);
//   formData.append('data', new Blob([JSON.stringify(courseData)], { type: 'application/json' }));
  
//   this.appservice.uploadNewCourse(formData).subscribe({
//     next: (response) => {

//       if (response.status === 200) {
//       // this.isLoading = false; // Dừng loading
//         Swal.fire({
//                     icon: 'success',
//                     title: 'Upload thành công !',
//                     text: response.message,
//                     confirmButtonText: 'OK',
//                   });
//                   this.courseForm.reset();
//                   this.ngOnInit();
//       }
//       else{
//         this.isLoading = false;
//         Swal.fire({
//           icon: 'info',
//           title: 'Upload không thành công !',
//           text: response.message,
//           confirmButtonText: 'OK',
//         });
//         this.courseForm.reset();
//       }
//     },

//     error: (error) => {
//       console.error('Lỗi upload:', error);
//       this.isLoading = false; // Dừng loading khi lỗi xảy ra
//       this.courseForm.reset();
//       alert('Upload thất bại!');

//     }
//   });
  


//   this.courseDetail.course_name = courseName;
//   this.courseDetail.instructor = username;
//   this.courseDetail.curriculum = title;
//   this.courseDetail.description = description;
//   this.courseDetail.price = price;

//   const timeCourse = this.courseForm.get('timeCourse')?.value;
//   const lectures = this.courseForm.get('lectures')?.value;
//   const language = this.courseForm.get('language')?.value;
//   const certificate = this.courseForm.get('certificate')?.value;

//   this.courseDetail.timeCourse = timeCourse;
//   this.courseDetail.lectures = lectures;
//   this.courseDetail.language = language;
//   this.courseDetail.certificate = certificate;

//   // call api add course detail
//   this.appservice.addDetailLessonApi(this.courseDetail).subscribe({
//     next: (response) => {
//       if (response.status === 200) {
//         this.isLoading = false; // Dừng loading
//         Swal.fire({
//           icon: 'success',
//           title: 'Upload thành công !',
//           text: response.message,
//           confirmButtonText: 'OK',
//         });
//         this.courseForm.reset();
//       }
//       else{
//         this.isLoading = false;
//         Swal.fire({
//           icon: 'info',
//           title: 'Upload không thành công !',
//           text: response.message,
//           confirmButtonText: 'OK',
//         });
//         this.courseForm.reset();
//       }
//     },
//     error: (error) => {
//       console.error('Lỗi upload:', error);
//       this.isLoading = false; // Dừng loading khi lỗi xảy ra
//       this.courseForm.reset();
//       alert('Upload thất bại!');
//     }
//   });

// }
// uploadCourse() {
//   if (!this.courseForm.valid || !this.selectedFileCourse) {
//     Swal.fire({
//       icon: 'info',
//       title: 'Upload không thành công !',
//       text: 'Vui lòng nhập đầy đủ thông tin và chọn file',
//       confirmButtonText: 'OK',
//     });
//     return;
//   }

//   this.isLoading = true;

//   const courseName = this.courseForm.get('courseName')?.value;
//   const title = this.courseForm.get('title')?.value;
//   const description = this.courseForm.get('tidescriptiontle')?.value;
//   const avatarCourseUrl = this.courseForm.get('avatarCourseUrl')?.value;
//   const price = this.courseForm.get('price')?.value;
//   const content = this.courseForm.get('content')?.value;
//   const author = this.authService.getUserName();

//   const courseData = {
//     course_name: courseName,
//     title,
//     description,
//     avatarCourseUrl,
//     price,
//     content,
//     author
//   };

//   const formData = new FormData();
//   formData.append('file', this.selectedFileCourse);
//   formData.append('data', new Blob([JSON.stringify(courseData)], { type: 'application/json' }));

//   // Gọi API 1 trước
//   this.appservice.uploadNewCourse(formData).subscribe({
//     next: (response) => {
//       if (response.status === 200) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Upload thành công !',
//           text: response.message,
//           confirmButtonText: 'OK',
//         });

//         // Tiếp tục chuẩn bị dữ liệu cho API 2
//         this.courseDetail.course_name = courseName;
//         this.courseDetail.instructor = author;
//         this.courseDetail.curriculum = title;
//         this.courseDetail.description = description;
//         this.courseDetail.price = price;

//         const timeCourse = this.courseForm.get('timeCourse')?.value;
//         const lectures = this.courseForm.get('lectures')?.value;
//         const language = this.courseForm.get('language')?.value;
//         const certificate = this.courseForm.get('certificate')?.value;

//         this.courseDetail.timeCourse = timeCourse;
//         this.courseDetail.lectures = lectures;
//         this.courseDetail.language = language;
//         this.courseDetail.certificate = certificate;

//         const reviewsList: Reviews[] = [];
//         const reviewDefault = new Reviews();
//         reviewDefault.rating = 5;
//         reviewDefault.comment = "Bài giảng rất chi tiết!";

//         this.reviewsList.push(reviewDefault);

//         this.courseDetail.reviews = this.reviewsList;
        
//         // Gọi API 2 sau khi API 1 thành công
//         this.appservice.addDetailLessonApi(this.courseDetail).subscribe({
          
//           next: (response2) => {
//             if (response2.status === 200) {
//               Swal.fire({
//                 icon: 'success',
//                 title: 'Thêm chi tiết khóa học thành công!',
//                 text: response2.message,
//                 confirmButtonText: 'OK',
//               });
//               this.courseForm.reset();
//               this.ngOnInit();
//             } else {
//               Swal.fire({
//                 icon: 'info',
//                 title: 'Thêm chi tiết không thành công!',
//                 text: response2.message,
//                 confirmButtonText: 'OK',
//               });
//             }
//             this.isLoading = false;
//           },
//           error: (error) => {
//             console.error('Lỗi add chi tiết:', error);
//             this.isLoading = false;
//             alert('Thêm chi tiết thất bại!');
//             this.courseForm.reset();
//           }
//         });

//       } else {
//         this.isLoading = false;
//         Swal.fire({
//           icon: 'info',
//           title: 'Upload không thành công !',
//           text: response.message,
//           confirmButtonText: 'OK',
//         });
//         this.courseForm.reset();
//       }
//     },

//     error: (error) => {
//       console.error('Lỗi upload:', error);
//       this.isLoading = false;
//       alert('Upload thất bại!');
//       this.courseForm.reset();
//     }
//   });
// }


uploadCourse() {
  if (!this.courseForm.valid || !this.selectedFileCourse) {
    Swal.fire({
      icon: 'info',
      title: 'Upload không thành công !',
      text: 'Vui lòng nhập đầy đủ thông tin và chọn file',
      confirmButtonText: 'OK',
    });
    return;
  }

  this.isLoading = true;

  const courseName = this.courseForm.get('courseName')?.value;
  const title = this.courseForm.get('title')?.value;
  const description = this.courseForm.get('tidescriptiontle')?.value;
  const avatarCourseUrl = this.courseForm.get('avatarCourseUrl')?.value;
  const price = this.courseForm.get('price')?.value;
  const content = this.courseForm.get('content')?.value;
  const author = this.authService.getUserName();

  const courseData = {
    course_name: courseName,
    title,
    description,
    avatarCourseUrl,
    price,
    content,
    author
  };

  const formData = new FormData();
  formData.append('file', this.selectedFileCourse);
  formData.append('data', new Blob([JSON.stringify(courseData)], { type: 'application/json' }));

  // Gọi API 1 trước
  this.appservice.uploadNewCourse(formData).subscribe({
    next: (response) => {
      if (response.status === 200) {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Upload thành công !',
          text: response.message,
          confirmButtonText: 'OK',
        });

        // Tiếp tục chuẩn bị dữ liệu cho API 2
        this.courseDetail.course_name = courseName;
        this.courseDetail.instructor = author;
        this.courseDetail.curriculum = title;
        this.courseDetail.description = description;
        this.courseDetail.price = price;

        const timeCourse = this.courseForm.get('timeCourse')?.value;
        const lectures = this.courseForm.get('lectures')?.value;
        const language = this.courseForm.get('language')?.value;
        const certificate = this.courseForm.get('certificate')?.value;

        this.courseDetail.timeCourse = timeCourse;
        this.courseDetail.lectures = lectures;
        this.courseDetail.language = language;
        this.courseDetail.certificate = certificate;

        const reviewsList: Reviews[] = [];
        const reviewDefault = new Reviews();
        reviewDefault.rating = 5;
        reviewDefault.comment = "Bài giảng rất chi tiết!";

        this.reviewsList.push(reviewDefault);

        this.courseDetail.reviews = this.reviewsList;
        
        // 🕒 Đợi 60s giây trước khi gọi API 2
        setTimeout(() => {
          this.appservice.addDetailLessonApi(this.courseDetail).subscribe({
            next: (response2) => {
              if (response2.status === 200) {
                Swal.fire({
                  icon: 'success',
                  title: 'Thêm chi tiết khóa học thành công!',
                  text: response2.message,
                  confirmButtonText: 'OK',
                });
                this.courseForm.reset();
                this.ngOnInit();
              } else {
                Swal.fire({
                  icon: 'info',
                  title: 'Thêm chi tiết không thành công!',
                  text: response2.message,
                  confirmButtonText: 'OK',
                });
              }
              this.isLoading = false;
            },
            error: (error) => {
              console.error('Lỗi add chi tiết:', error);
              this.isLoading = false;
              alert('Thêm chi tiết thất bại!');
              this.courseForm.reset();
            }
          });
        }, 40000); // 🕒 Trì hoãn 60s mới gọi api

      } else {
        this.isLoading = false;
        Swal.fire({
          icon: 'info',
          title: 'Upload không thành công !',
          text: response.message,
          confirmButtonText: 'OK',
        });
        this.courseForm.reset();
      }
    },

    error: (error) => {
      console.error('Lỗi upload:', error);
      this.isLoading = false;
      alert('Upload thất bại!');
      this.courseForm.reset();
    }
  });
}






onImageError(event: Event) {
  (event.target as HTMLImageElement).src = 'https://nehalist.io/content/images/2017/09/angular-logo.png';
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