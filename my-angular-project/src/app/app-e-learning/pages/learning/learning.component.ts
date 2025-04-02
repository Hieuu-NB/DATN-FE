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

// interface Comment {
//   id: number;
//   lectureId: number;
//   userId: number;
//   userName: string;
//   content: string;
//   createdAt: Date;
// }

// comment.model.ts
export interface Comment {
  id: number;
  lectureId: number;
  userId: number;
  userName: string;
  userAvatar?: string; // Thêm avatar nếu cần
  content: string;
  createdAt?: Date;
  parentId?: number | null; // null nếu là comment gốc
  replies: Comment[]; // Danh sách reply
  isExpanded?: boolean; // Dùng để toggle hiển thị replies
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
  userRoles: string[] = []; // Mảng chứa các role của user
  userName: string = ''; // Tên của user
  newComment: string = '';
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
    this.userRoles = this.authService.getUserRoles(); // Lấy role của user từ token
    this.userName = this.authService.getUserName();  // Lấy tên của user từ token
    this.route.queryParams.subscribe(params => {
      this.courseName = params['courseName'];
      if (this.courseName) {
        // this.loadCourse(this.courseId); // Call API

        this.appservice.loadLessonByCourseNameApi(this.courseName).subscribe((data: any) => {  

          this.lectures = data;
    
          this.selectedLecture = this.lectures[0];
          
          console.log("12321 :"+this.lectures[0].titleDetail);
          
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


  // Hàm chọn bài giảng
  selectLecture(lecture: Lecture, event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    this.selectedLecture = lecture;
    console.log('Bài giảng được chọn:', this.selectedLecture.title); // Kiểm tra dữ liệu
    
  }

// Danh sách bình luận giả
// comments: Comment[] = [
//   {
//     id: 1,
//     lectureId: 1,
//     userId: 101,
//     userName: 'Nguyễn Văn A',
//     content: 'Bài giảng rất hay và dễ hiểu, cảm ơn giảng viên!',
//     createdAt: new Date('2023-05-15T10:30:00')
//   },
//   {
//     id: 2,
//     lectureId: 1,
//     userId: 102,
//     userName: 'Trần Thị B',
//     content: 'Mình chưa hiểu phần lúc 5:30, ai giải thích giúp mình với?',
//     createdAt: new Date('2023-05-16T14:15:00')
//   },
//   {
//     id: 3,
//     lectureId: 1,
//     userId: 103,
//     userName: 'Lê Văn C',
//     content: 'Phần thực hành rất hữu ích, mình đã áp dụng được ngay vào công việc.',
//     createdAt: new Date('2023-05-17T09:45:00')
//   },
//   {
//     id: 4,
//     lectureId: 1,
//     userId: 104,
//     userName: 'Phạm Thị D',
//     content: 'Tài liệu đính kèm rất chi tiết, mình đã tải về để nghiên cứu thêm.',
//     createdAt: new Date('2023-05-18T16:20:00')
//   }
// ];

// Trong component hoặc service
comments: Comment[] = [
  {
    id: 1,
    lectureId: 1,
    userId: 101,
    userName: 'Nguyễn Văn A',
    content: 'Bài giảng rất hay và dễ hiểu, cảm ơn giảng viên!',
    createdAt: new Date('2023-05-15T10:30:00'),
    parentId: null,
    replies: [
      {
        id: 4,
        lectureId: 1,
        userId: 104,
        userName: 'Phạm Thị D',
        content: 'Mình cũng thấy rất hữu ích!',
        createdAt: new Date('2023-05-15T11:45:00'),
        parentId: 1,
        replies: [
          {
            id: 6,
            lectureId: 1,
            userId: 101,
            userName: 'Nguyễn Văn A',
            content: 'Cảm ơn bạn đã đồng ý với mình!',
            createdAt: new Date('2023-05-15T12:30:00'),
            parentId: 4,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    lectureId: 1,
    userId: 102,
    userName: 'Trần Thị B',
    content: 'Mình chưa hiểu phần lúc 5:30, ai giải thích giúp mình với?',
    createdAt: new Date('2023-05-16T14:15:00'),
    parentId: null,
    replies: [
      {
        id: 3,
        lectureId: 1,
        userId: 103,
        userName: 'Lê Văn C',
        content: 'Phần đó là nói về... (giải thích chi tiết)',
        createdAt: new Date('2023-05-16T15:30:00'),
        parentId: 2,
        replies: []
      },
      {
        id: 5,
        lectureId: 1,
        userId: 105,
        userName: 'Hoàng Văn E',
        content: 'Bạn có thể xem lại slide 15 nhé!',
        createdAt: new Date('2023-05-16T16:45:00'),
        parentId: 2,
        replies: []
      }
    ]
  }
];

 // Hàm thêm bình luận mới
//  addComment() {
//   if (!this.newComment.trim()) return;

//   const newComment: Comment = {
//     id: this.comments.length + 1,
//     lectureId: this.selectedLecture.id,
//     userId: 105, // ID người dùng giả định
//     userName: this.userName.toUpperCase(), // Tên người dùng giả định
//     content: this.newComment,
//     createdAt: new Date()
//   };

//   this.comments.unshift(newComment); // Thêm vào đầu mảng

//   this.newComment = ''; // Reset ô nhập liệu

//   // Trong thực tế, bạn sẽ gọi service để lưu vào database
//   console.log('Bình luận mới:', newComment);
// }

// Trong component
activeReplyForm: number | null = null;
replyContents: { [key: number]: string } = {};
replyingTo: Comment | null = null;

// Hàm đếm tổng số comments (bao gồm cả replies)
getTotalComments(): number {
  let count = 0;
  const countReplies = (comments: Comment[]) => {
    comments.forEach(comment => {
      count++;
      if (comment.replies?.length) {
        countReplies(comment.replies);
      }
    });
  };
  countReplies(this.comments);
  return count;
}

// Mở form reply
toggleReplyForm(commentId: number) {
  this.activeReplyForm = this.activeReplyForm === commentId ? null : commentId;
  if (this.activeReplyForm) {
    this.replyingTo = this.findCommentById(commentId, this.comments);
  } else {
    this.replyingTo = null;
  }
}

// Tìm comment theo ID (đệ quy)
findCommentById(id: number, comments: Comment[]): Comment | null {
  for (const comment of comments) {
    if (comment.id === id) return comment;
    if (comment.replies?.length) {
      const found = this.findCommentById(id, comment.replies);
      if (found) return found;
    }
  }
  return null;
}

// Toggle hiển thị replies
toggleReplies(comment: Comment) {
  comment.isExpanded = !comment.isExpanded;
}

// Hủy reply
cancelReply() {
  this.activeReplyForm = null;
  this.replyingTo = null;
}

// Gửi reply
submitReply(parentComment: Comment) {
  const content = this.replyContents[parentComment.id];
  if (!content?.trim()) return;

  const newReply: Comment = {
    id: this.generateNewId(),
    lectureId: this.selectedLecture.id,
    userId: this.userName.length + 1, // ID người dùng giả định
    userName: this.userName.toUpperCase(), // Tên người dùng giả định
    content: content,
    createdAt: new Date(),
    parentId: parentComment.id,
    replies: []
  };

  if (!parentComment.replies) {
    parentComment.replies = [];
  }
  parentComment.replies.unshift(newReply);
  
  // Mở rộng phần replies nếu đang đóng
  parentComment.isExpanded = true;
  
  // Reset form
  this.replyContents[parentComment.id] = '';
  this.activeReplyForm = null;
  this.replyingTo = null;
  
  // Trong thực tế: gọi API để lưu vào database
  console.log('Reply added:', newReply);
}

// Hàm tạo ID mới (tạm thời)
generateNewId(): number {
  let maxId = 0;
  const findMaxId = (comments: Comment[]) => {
    comments.forEach(comment => {
      if (comment.id > maxId) maxId = comment.id;
      if (comment.replies?.length) findMaxId(comment.replies);
    });
  };
  findMaxId(this.comments);
  return maxId + 1;
}
info = 'info@gmail.com';


addComment(parentComment?: Comment) {
  // Xác định nội dung comment
  const content = parentComment 
    ? this.replyContents[parentComment.id] 
    : this.newComment;
  
  if (!content?.trim()) return;

  // Tạo comment mới
  const newComment: Comment = {
    id: this.generateNewId(),
    lectureId: this.selectedLecture.id,
    userId: this.userName.length + 1, // ID người dùng giả định
    userName: this.userName.toUpperCase(),
    userAvatar: this.userName, // Nếu có avatar
    content: content,
    createdAt: new Date(),
    parentId: parentComment ? parentComment.id : null,
    replies: [],
    isExpanded: false
  };

  // Thêm vào danh sách phù hợp
  if (parentComment) {
    // Thêm reply vào comment cha
    if (!parentComment.replies) {
      parentComment.replies = [];
    }
    parentComment.replies.unshift(newComment);
    parentComment.isExpanded = true; // Mở rộng phần replies
    
    // Reset form reply
    this.replyContents[parentComment.id] = '';
    this.activeReplyForm = null;
  } else {
    // Thêm comment gốc
    this.comments.unshift(newComment);
    this.newComment = ''; // Reset ô nhập comment gốc
  }

  // Trong thực tế: Gọi API để lưu vào database
  console.log('Comment added:', newComment);
  
  // Gọi service nếu kết nối backend
  // this.commentService.addComment(newComment).subscribe({
  //   next: (savedComment) => {
  //     // Cập nhật comment với dữ liệu từ server
  //   },
  //   error: (err) => {
  //     console.error('Error adding comment:', err);
  //     // Xử lý rollback nếu cần
  //   }
  // });
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
