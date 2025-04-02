import { Component, ElementRef, OnInit, Pipe, PipeTransform, Renderer2 } from '@angular/core';
import { AppService } from '../../store/app.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
interface Authors {
  id: number;
  username: string;
  specialization: string;
  rating: number;
  courseCount: number;
  studentCount: number;
  avatarUrl: string;
  bio: string;
}
// id: 1,
//       username: 'John Smith',
//       specialization: 'Web Development',
//       rating: 4.9,
//       courseCount: 15,
//       studentCount: 3250,
//       avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
//       bio: 'Senior web developer with 10+ years of experience in JavaScript frameworks like Angular and React.'

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 100, completeWords = false, ellipsis = '...') {
    if (!value) return '';
    if (value.length <= limit) return value;

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css']
})
export class ListAuthorComponent implements OnInit {
  
  // defaultAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  defaultAvatar = 'assets/img/pexels-fauxels-3184328.jpg'
  searchQuery = '';
  
  // Sample data
  // allAuthors = [
    // {
    //   id: 1,
    //   username: 'John Smith',
    //   specialization: 'Web Development',
    //   rating: 4.9,
    //   courseCount: 15,
    //   studentCount: 3250,
    //   avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    //   bio: 'Senior web developer with 10+ years of experience in JavaScript frameworks like Angular and React.'
    // },
    // {
    //   id: 2,
    //   username: 'Sarah Johnson',
    //   specialization: 'Data Science',
    //   rating: 4.6,
    //   courseCount: 8,
    //   studentCount: 1875,
    //   avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    //   bio: 'Data scientist specializing in machine learning and Python programming.'
    // },
    // {
    //   id: 3,
    //   username: 'Michael Brown',
    //   specialization: 'Mobile Development',
    //   rating: 4.8,
    //   courseCount: 12,
    //   studentCount: 2890,
    //   avatarUrl: null,
    //   bio: 'Expert in iOS and Android app development with Flutter and React Native.'
    // },
    // {
    //   id: 4,
    //   username: 'Emily Davis',
    //   specialization: 'UI/UX Design',
    //   rating: 4.5,
    //   courseCount: 10,
    //   studentCount: 2150,
    //   avatarUrl: 'https://randomuser.me/api/portraits/women/63.jpg',
    //   bio: 'Professional designer focused on creating beautiful and functional user interfaces.'
    // }
  // ];
  allAuthors: any[] = [];


  ngOnInit(): void {
    this.resetFilters();

    this.appservice.listTeacher().subscribe(
      (data) => { 
        this.allAuthors = [];
        this.allAuthors = data.data;
      }
    );
    this.updateFilterCounts();
  }
  filteredAuthors = [...this.allAuthors];
  
  // Filter options
  ratingFilters = [
    { value: 4.5, label: '4.5 & up', selected: false, count: 0 },
    { value: 4.0, label: '4.0 & up', selected: false, count: 0 },
    { value: 3.5, label: '3.5 & up', selected: false, count: 0 }
  ];

  specializationFilters = [
    { value: 'web', label: 'Web Development', selected: false, count: 0 },
    { value: 'data', label: 'Data Science', selected: false, count: 0 },
    { value: 'mobile', label: 'Mobile Development', selected: false, count: 0 },
    { value: 'design', label: 'UI/UX Design', selected: false, count: 0 },
    { value: 'marketing', label: 'Digital Marketing', selected: false, count: 0 }
  ];
  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user
  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
    private appservice: AppService,
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {

    // this.allAuthors = this.route.snapshot.data['apiData'];

    this.updateFilterCounts();
    this.userRoles = this.authService.getUserRoles(); // Lấy role của user từ token
    this.userName = this.authService.getUserName();  // Lấy tên của user từ token
    this.resetFilters();
    this.updateFilterCounts();
    this.appservice.listTeacher().subscribe(
      (data) => { 
        this.allAuthors = [];
        this.allAuthors = data.data;
      }
    );
    this.updateFilterCounts();
  }

  // Update filter counts based on current data
  updateFilterCounts() {
    if (this.ratingFilters != null) {
      this.ratingFilters.forEach(filter => {
        filter.count = this.allAuthors.filter(a => a.rating >= filter.value).length;
      });
    }
    

    this.specializationFilters.forEach(filter => {
      filter.count = this.allAuthors.filter(a => 
        a.specialization.toLowerCase().includes(filter.value)
      ).length;
    });
  }

  // Main filtering function
  filterAuthors() {
    let results = [...this.allAuthors];

    // Search by name
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      results = results.filter(a => 
        a.username.toLowerCase().includes(query)
      );
    }

    // Filter by rating
    const selectedRatings = this.ratingFilters
      .filter(f => f.selected)
      .map(f => f.value);
      
    if (selectedRatings.length > 0) {
      results = results.filter(a => 
        selectedRatings.some(rating => a.rating >= rating)
      );
    }

    // Filter by specialization
    const selectedSpecs = this.specializationFilters
      .filter(f => f.selected)
      .map(f => f.value);
      
    if (selectedSpecs.length > 0) {
      results = results.filter(a => 
        selectedSpecs.some(spec => 
          a.specialization.toLowerCase().includes(spec)
        ));
    }

    this.filteredAuthors = results;
  }

  // Reset all filters
  resetFilters() {
    this.searchQuery = '';
    this.ratingFilters.forEach(f => f.selected = false);
    this.specializationFilters.forEach(f => f.selected = false);
    this.filterAuthors();
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






























