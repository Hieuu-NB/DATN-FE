export class User {
    username!: any;
    password!: any;
}

export class UserRegister {
    username!: any;
    phone!: any;
    email!: any;
    password!: any;
    role!: any;
}

export class UserCourseName {
    username!: string;
    course_name!: string;
  }

export class UserName {
    username!: string;
}

export class UserEdit {
    username!: any;
    avatarUrl!: any;
    phone!: any;
    email!: any;
    password!: any;
    role!: any;
}

export class DetailCourse {
    course_name!: any;
    instructor!: any;
    timeCourse!: any;
    lectures!: any;
    language!: any;
    certificate!: any;
    description!: any;
    curriculum!: any;
    price!: any;
    reviews!: Reviews[];
}

export class Reviews {
    rating!: any;
    comment!: any;
}

// {
//     "course_name":"MVC-1", // thay ten khóa học để thêm chi tiết
//     "instructor": "Nguyễn Văn A",
//     "timeCourse": "40 giờ",
//     "lectures": "20 bài giảng",
//     "language": "Tiếng Việt",
//     "certificate": "Có chứng chỉ",
//     "description": "Khóa học về Java Spring Boot chi tiết",
//     "curriculum": "Nội dung chương trình giảng dạy",  == title
//     "price":0,
//     "reviews": [
//         {
//             "rating": 5,
//             "comment": "Bài giảng rất chi tiết!"
//         },
//         {
//             "rating": 4,
//             "comment": "Khóa học hữu ích, nhưng cần thêm bài tập thực hành."
//         },
//         {
//             "rating": 3,
//             "comment": "Chất lượng video nên cải thiện hơn."
//         }
//     ]
// }