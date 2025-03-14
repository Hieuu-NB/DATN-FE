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

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'trang-chu', component: TrangChuComponent ,canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'sign-in', component: LoginComponent},
  { path: 'home', component: HomeComponent }, 
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'course-detail', component: CourseDetailComponent },
  { path: 'my-course', component: MyCourseComponent },
  { path: 'qr-code', component: QRCodeComponent },
  { path: 'admin',component: AdminComponent,canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'unauthorized',component: UnauthorizedComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
