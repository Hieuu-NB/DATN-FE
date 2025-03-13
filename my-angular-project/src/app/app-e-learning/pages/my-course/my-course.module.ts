import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MyCourseComponent } from "./my-course.component";

const routes: Routes = [
    {
      path: '', component: MyCourseComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        MyCourseComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
    //providers: [OverlayService]
  })
  export class MyCourseModule { }
  