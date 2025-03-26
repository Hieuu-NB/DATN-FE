import { Component, OnInit } from '@angular/core';
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
  thumbnail: string;
  price: number;
  students: number;
  rating: number;
}


@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {

 


  
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
  isLoading = true;

  ngOnInit(): void {
    // Simulate API call
    setTimeout(() => {
      this.courses = [
        {
          id: 1,
          title: 'Lập trình JavaScript từ Zero đến Hero',
          description: 'Khóa học toàn diện về JavaScript hiện đại, bao gồm ES6+, DOM, Async/Await và các dự án thực tế.',
          thumbnail: 'https://img-c.udemycdn.com/course/480x270/1441546_17f9_2.jpg',
          price: 499000,
          students: 2345,
          rating: 4.8
        },
        {
          id: 2,
          title: 'React.js - Xây dựng ứng dụng thực tế',
          description: 'Học React qua các dự án thực tế, bao gồm Redux, Hooks, Context API và tích hợp Firebase.',
          thumbnail: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
          price: 599000,
          students: 1876,
          rating: 4.9
        },
        {
          id: 3,
          title: 'Node.js & Express - Backend Mastery',
          description: 'Xây dựng RESTful APIs với Node.js, Express và MongoDB. Học cách triển khai ứng dụng lên Heroku.',
          thumbnail: 'https://img-c.udemycdn.com/course/480x270/1463348_52a4_2.jpg',
          price: 649000,
          students: 1542,
          rating: 4.7
        },
        {
          id: 4,
          title: 'Thiết kế UI/UX cơ bản cho Developer',
          description: 'Khóa học giúp developer hiểu nguyên tắc thiết kế để tạo ứng dụng đẹp và thân thiện người dùng.',
          thumbnail: 'https://img-c.udemycdn.com/course/480x270/1576854_9aeb_2.jpg',
          price: 399000,
          students: 987,
          rating: 4.5
        }
      ];
      this.isLoading = false;
    }, 1500);
  }

  viewCourseDetail(courseId: number): void {
    console.log('Viewing course detail:', courseId);
    // Trong ứng dụng thực tế, bạn có thể điều hướng đến trang chi tiết:
    // this.router.navigate(['/courses', courseId]);
  }

}
