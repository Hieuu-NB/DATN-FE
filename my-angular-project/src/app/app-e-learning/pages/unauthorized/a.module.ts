import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UnauthorizedComponent } from "./unauthorized.component";

const routes: Routes = [
    {
      path: '', component: UnauthorizedComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        UnauthorizedComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
    //providers: [OverlayService]
  })
  export class UnauthorizedModule { }
  