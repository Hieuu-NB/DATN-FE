import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './app-e-learning/pages/sign-in/login.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataService } from './app-e-learning/store/ data.service';
import { InterceptService } from './core/intercept.service';
import { CommonModule } from '@angular/common';
import { SignUpModule } from './app-e-learning/pages/sign-up/sign-up.module';
import { HomeModule } from './app-e-learning/pages/home/home.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseDetailModule } from './app-e-learning/pages/course-detail/course-detail.module';
import { MyCourseModule } from './app-e-learning/pages/my-course/my-course.module';
import { AdminModule } from './app-e-learning/pages/admin/admin.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { LearningModule } from './app-e-learning/pages/learning/learning.module';
import { TeacherPageComponent } from './app-e-learning/pages/teacher-page/teacher-page.component';
import { TeacherPageModule } from './app-e-learning/pages/teacher-page/teacher-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    HttpClientModule,
    CommonModule,
    SignUpModule,
    HomeModule,
    NgbModule,
    CourseDetailModule,
    MyCourseModule,
    AdminModule,
    NgxPaginationModule,
    LearningModule,
    TeacherPageModule
  ],
  providers: [DataService,{ provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
