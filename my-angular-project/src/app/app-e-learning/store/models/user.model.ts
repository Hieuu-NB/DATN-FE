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


export class LoadLessonByCourseNameAndUserName {
    courseName!: any;
    userName!: any;
}

export class NotiBuyCourse {
    courseName!: any;
    userName!: any;
}