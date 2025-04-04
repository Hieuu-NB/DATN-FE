import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { TruncatePipe } from "src/app/truncate.pipe";
import { CourseDetailPopupModule } from "../popup/course-detail-popup/course-detail-popup.module";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
    {
      path: '', component: AdminComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        AdminComponent,
        // CourseDetailPopupComponent,
        TruncatePipe,

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
  export class AdminModule { }
  