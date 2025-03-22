import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { LearningComponent } from "./learning.component";

const routes: Routes = [
    {
      path: '', component: LearningComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        LearningComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
    ],
    //providers: [OverlayService]
  })
  export class LearningModule { }
  