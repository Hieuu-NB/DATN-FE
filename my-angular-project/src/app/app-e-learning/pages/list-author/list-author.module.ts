import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ListAuthorComponent } from "./list-author.component";

const routes: Routes = [
    {
      path: '', component: ListAuthorComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        ListAuthorComponent,
    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule
    ],
    //providers: [OverlayService]
  })
  export class ListAuthorComponentModule { }
  