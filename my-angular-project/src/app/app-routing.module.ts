import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app-e-learning/pages/sign-in/login.component';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './app-e-learning/pages/home/home.component';
import { UnauthorizedComponent } from './app-e-learning/pages/unauthorized/unauthorized.component';
import { SignUpComponent } from './app-e-learning/pages/sign-up/sign-up.component';
import { CourseDetailComponent } from './app-e-learning/pages/course-detail/course-detail.component';
import { MyCourseComponent } from './app-e-learning/pages/my-course/my-course.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { AdminComponent } from './app-e-learning/pages/admin/admin.component';
import { LearningComponent } from './app-e-learning/pages/learning/learning.component';
import { TeacherPageComponent } from './app-e-learning/pages/teacher-page/teacher-page.component';
import { AboutUsComponent } from './app-e-learning/pages/about-us/about-us.component';
import { ListAuthorComponent } from './app-e-learning/pages/list-author/list-author.component';
import { AuthorDetailComponent } from './app-e-learning/pages/author-detail/author-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },                     // trang mặc định là trang chủ
  { path: 'sign-in', component: LoginComponent},              // trang đăng nhập
  { path: 'home', component: HomeComponent },                 // trang chủ
  { path: 'sign-up', component: SignUpComponent },            // trang đăng ký
  { path: 'course-detail', component: CourseDetailComponent },// trang chi tiết khóa học
  { path: 'my-course', component: MyCourseComponent },        // trang khóa học của sinh viên
  { path: 'qr-code', component: QRCodeComponent },            // trang tạo mã QR
  { path: 'admin',component: AdminComponent,canActivate: [AuthGuard], data: { roles: ['Admin'] } }, // trang admin 
  { path: 'learning-page',component: LearningComponent },     // trang học của sinh viên
  { path: 'teacher-page',component: TeacherPageComponent },   // trang giáo viên
  { path: 'about-us',component: AboutUsComponent },           // trang giới thiệu về chúng tôi
  { path: 'list-author',component: ListAuthorComponent },     // trang danh sách tác giả
  { path: 'author-detail',component: AuthorDetailComponent }, // trang chi tiết tác giả
  { path: 'unauthorized',component: UnauthorizedComponent }, // trang không có quyền truy cập

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
