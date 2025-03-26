import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserCourseName, UserEdit, UserName, UserRegister } from "./models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'any',
  })

export class AppService {
    constructor(private http: HttpClient) {}
    private apiUrlCourse = 'http://localhost:9002/course-service';

    loadAllUsers(){ // load table Users ra 
      return this.http.get<any>(
        'http://localhost:1223/authorization-service/show-all-user'
      );
    }

    loadAllUsersAndCourse(){ // load table Users ra và cả các khóa học user đã đăng kí
      return this.http.get<any>(
        'http://localhost:1223/authorization-service/show-all-user-and-course'
      );
    }



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
        'http://localhost:9002/course-service/course/listCourseApproved'
      );
    }

    loadAllCourseNotApproved(){
      return this.http.get<any>(
        'http://localhost:9002/course-service/course/listCourseNonApprove'
      );
    }

    loadAllCourseUpload(){
      return this.http.get<any>(
        'http://localhost:9002/course-service/course/showAllCourse'
      );
    }

    listCourseUploadByTeacher(username: any){
      return this.http.get<any>(
        `http://localhost:9002/course-service/file/show-course-upload-by-teacher/${username}`
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

    deleteUser(username: any){
      return this.http.post<any>(
        `http://localhost:1223/authorization-service/delete-user-by-username/${username}`,null
      );
    }

    updateUserByAdmin(user: UserEdit){
      return this.http.post<any>(
        `http://localhost:1223/authorization-service/edit-user-by-username`,
        user
      );
    }


    uploadCourse(
      file: File,
      courseName: any,
      title: any,
      description: any,
      avatarCourseUrl: any,
      price: any,
      content: any
    ): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
  
      const headers = new HttpHeaders(); // Không cần 'Content-Type': 'multipart/form-data' vì FormData sẽ tự động set
  
      return this.http.post<any>(
        `${this.apiUrlCourse}/file/createCourse/${courseName}/${title}/${description}/${avatarCourseUrl}/${price}/${content}`,
        formData,
        { headers }
      );
    }




    uploadLesson(
      file: File,
      title: any,
      description: any,
      avatarLesson: any,
      byCourse: any
    ): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
  
      const headers = new HttpHeaders(); // Không cần 'Content-Type': 'multipart/form-data' vì FormData sẽ tự động set
  
      return this.http.post<any>(
        `${this.apiUrlCourse}/file/uploadLesson/${title}/${description}/${avatarLesson}/${byCourse}`,
        formData,
        { headers }
      );
    }


    uploadNewLesson(formData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrlCourse}/file/uploadLesson`, formData);
    }
    
    uploadNewCourse(formData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrlCourse}/file/createCourse`, formData);
    }
    
    approveCourseByAdmin(courseName: any): Observable<any> {
      return this.http.post(`${this.apiUrlCourse}/course/approve-course/${courseName}`, null);
    }

    pendingCourseByAdmin(courseName: any): Observable<any> {
      return this.http.post(`${this.apiUrlCourse}/course/pending-course/${courseName}`, null);
    }

    rejectCourseByAdmin(courseName: any): Observable<any> {
      return this.http.post(`${this.apiUrlCourse}/course/reject-course/${courseName}`, null);
    }
    
    
    

    // api load lesson by course name
    loadLessonByCourseNameApi(courseName: any){
      return this.http.post<any>(
        `http://localhost:9002/course-service/course/list-Lesson-by-name-course`,courseName
      );
    }
    
    // api thêm chi tiết cho bài học
    addDetailLessonApi(lesson: any){
      return this.http.post<any>(
        `http://localhost:9002/course-service/course/add-course-detail`,lesson
      );
    }

    loadCourseByCourseName(courseName: any){
      return this.http.post<any>(
        `http://localhost:9002/course-service/course/findCourseByCourseName`,courseName
      );
    }
}