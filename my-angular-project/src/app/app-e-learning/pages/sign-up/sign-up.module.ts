import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SignUpComponent } from "./sign-up.component";

const routes: Routes = [
    {
      path: '', component: SignUpComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        SignUpComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
    //providers: [OverlayService]
  })
  export class SignUpModule { }
  