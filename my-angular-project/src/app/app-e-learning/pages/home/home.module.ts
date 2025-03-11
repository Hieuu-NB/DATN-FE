import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";

const routes: Routes = [
    {
      path: '', component: HomeComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
    //providers: [OverlayService]
  })
  export class HomeModule { }
  