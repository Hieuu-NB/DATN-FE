import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
      path: '', component: LoginComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
    //providers: [OverlayService]
  })
  export class LoginModule { }
  