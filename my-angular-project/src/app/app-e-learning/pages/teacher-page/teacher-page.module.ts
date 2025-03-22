import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TeacherPageComponent } from "./teacher-page.component";
import { NgxPaginationModule } from "ngx-pagination";

const routes: Routes = [
    {
      path: '', component: TeacherPageComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        TeacherPageComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
    ],
    //providers: [OverlayService]
  })
  export class TeacherPageModule { }
  