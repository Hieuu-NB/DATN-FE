import { Component, OnInit } from '@angular/core';
import { AppService } from '../../store/app.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  constructor(
     private appservice: AppService,
          private fb: FormBuilder,
          private router:Router,
          private authService: AuthService
  ) { }
  listCourse: any;

  courseFinancial: any[] = [];
  courseDataScience: any[] = [];
  courseMarketing: any[] = [];
  courseDevelopment: any[] = [];
  courseBusiness: any[] = [];





  userRoles: string[] = []; // Mảng chứa các role của user
  ngOnInit(): void {
    this.userRoles = this.authService.getUserRoles();

    this.listCourse = this.appservice.loadAllCourse().subscribe(
      (data) => {
        this.listCourse = data;
        console.log("listCourse :"+this.listCourse.status);
        console.log("listCourse :"+this.listCourse.message);
        console.log("listCourse :"+this.listCourse.data[0].content);

   
        if (this.listCourse.status == 200) {
          for (const element of this.listCourse.data) {
            if (element.content == "Financial") {
              this.courseFinancial.push(element);
            }
            if (element.content == "Data Science") {
              this.courseDataScience.push(element);
            }
            if (element.content == "Marketing") {
              this.courseMarketing.push(element);
            }
            if (element.content == "Development") {
              this.courseDevelopment.push(element);
            }
            if (element.content == "Business") {
              this.courseBusiness.push(element);
            }
          }
        }

        console.log(this.courseFinancial);

      }
    );
    
    console.log('User Roles:', this.userRoles); // Kiểm tra log
  }

  
}
