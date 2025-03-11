import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app-e-learning/pages/sign-in/login.component';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './app-e-learning/pages/home/home.component';
import { UnauthorizedComponent } from './app-e-learning/pages/unauthorized/unauthorized.component';
import { SignUpComponent } from './app-e-learning/pages/sign-up/sign-up.component';
import { CourseDetailComponent } from './app-e-learning/pages/course-detail/course-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'trang-chu', component: TrangChuComponent ,canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'sign-in', component: LoginComponent},
  { path: 'home', component: HomeComponent }, 
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'course-detail', component: CourseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
