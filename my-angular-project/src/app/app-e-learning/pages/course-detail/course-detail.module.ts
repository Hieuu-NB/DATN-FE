import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CourseDetailComponent } from "./course-detail.component";

const routes: Routes = [
    {
      path: '', component: CourseDetailComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        CourseDetailComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
    //providers: [OverlayService]
  })
  export class CourseDetailModule { }
  