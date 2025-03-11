import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {

  courseName: string = '';
  info= 'info@gmail.com';
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseName = params['courseName']; // Lấy giá trị courseName
      console.log('Course Name:', this.courseName);
    });
  }
}
