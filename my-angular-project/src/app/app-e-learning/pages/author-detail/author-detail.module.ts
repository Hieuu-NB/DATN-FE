import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { TruncatePipe } from "src/app/truncate.pipe";
import { CourseDetailPopupModule } from "../popup/course-detail-popup/course-detail-popup.module";
import { AuthorDetailComponent } from "./author-detail.component";

const routes: Routes = [
    {
      path: '', component: AuthorDetailComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        AuthorDetailComponent
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
  export class AuthorDetailModule { }
  