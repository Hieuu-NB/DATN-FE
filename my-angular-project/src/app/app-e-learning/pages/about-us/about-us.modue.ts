import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { CourseDetailPopupModule } from "../popup/course-detail-popup/course-detail-popup.module";
import { AboutUsComponent } from "./about-us.component";

const routes: Routes = [
    {
      path: '', component: AboutUsComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        AboutUsComponent,

    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    CourseDetailPopupModule
    ],
    //providers: [OverlayService]
  })
  export class AboutUsModule { }
  