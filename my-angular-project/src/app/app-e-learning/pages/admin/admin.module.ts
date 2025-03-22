import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { NgxPaginationModule } from "ngx-pagination";
import { TruncatePipe } from "src/app/truncate.pipe";

const routes: Routes = [
    {
      path: '', component: AdminComponent,
    }
  ];
  
  @NgModule({
    declarations: [
        AdminComponent,
        TruncatePipe,

    ],
    imports: [
      FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
    ],
    //providers: [OverlayService]
  })
  export class AdminModule { }
  