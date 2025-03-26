import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { CourseDetailPopupComponent } from "./course-detail-popup.component";

const routes: Routes = [
    {
      path: '', component: CourseDetailPopupComponent,
    }
  ];
  
  @NgModule({
    declarations: [
      CourseDetailPopupComponent
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
    ],
    exports: [CourseDetailPopupComponent] // Quan trọng: phải export
  })
  
  export class CourseDetailPopupModule { }
  