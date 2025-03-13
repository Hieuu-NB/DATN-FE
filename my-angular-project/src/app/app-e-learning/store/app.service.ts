import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User, UserCourseName, UserName, UserRegister } from "./models/user.model";

@Injectable({
    providedIn: 'any',
  })

export class AppService {
    constructor(private http: HttpClient) {}
  
    login_by_user(user: User){
      return this.http.post<any>(
        'http://localhost:1223/authorization-service/login',
        user
      );
    }
    register(user: UserRegister){
      return this.http.post<any>(
        'http://localhost:1223/authorization-service/register',
        user
      );
    }

    logout(){
      return this.http.get<any>(
        'http://localhost:8088/logout'
      );
    }

    loadAllCourse(){
      return this.http.get<any>(
        'http://localhost:9002/course-service/course/listCourse'
      );
    }


    loadCourseByName(nameCourse: any) {
      return this.http.get<any>(
        `http://localhost:9002/course-service/course/show-course-detail-by-name/${nameCourse}`
      );
    }

    addCourseForUser(user: UserCourseName){
      return this.http.post<any>(
        'http://localhost:1223/authorization-service/add-course-for-user',
        user
      );
    }
    
    loadMyCourseByUserName(userName: UserName) {
      return this.http.post<any>(
        `http://localhost:1223/authorization-service/show-my-course`,
        userName
      );
    }
}