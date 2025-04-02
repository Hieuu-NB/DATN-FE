import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PaymentCourseComponent } from "./payment-course.component";
import { SafeUrlPipe } from "src/app/core/safe-url.pipe";

const routes: Routes = [
    {
      path: '', component: PaymentCourseComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        PaymentCourseComponent,
        SafeUrlPipe
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
    //providers: [OverlayService]
  })
  export class PaymentCourseModule { }
  