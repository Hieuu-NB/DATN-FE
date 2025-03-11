import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../store/ data.service';
import { AppService } from '../../store/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Comments } from '../trang-chu/models/obj.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-trang-truyen',
  templateUrl: './trang-truyen.component.html',
  styleUrls: ['./trang-truyen.component.css']
})
export class TrangTruyenComponent implements OnInit {

  cmt?: any;
  message?: string;
  trangTruyen: any;
  data_truyen: any[] = [];
  ds_binh_luan: any[] = [];
  ds_binh_luan_view: any[] = [];

  list_commennt: any[] = [];
  arr: any[] = [];

  comment = new Comments();

  searchForm = new FormGroup({
    comment: new FormControl('')
  });

 
  // truyen_de_cu: any[] = [];
  constructor(private router:Router,
    private fb: FormBuilder,
    private data: DataService
    ,private appservice: AppService) { }

    ngOnInit() {
      this.searchForm = this.fb.group({
        comment: new FormControl('')
      });


      this.data.currentMessage.subscribe(message => this.message = message);
      console.log("data : " + this.message);

      this.appservice.showTrangTruyen(this.message).subscribe(w => {
      this.trangTruyen = w;
      console.log(w);

      // show cmt

      this.appservice.getAllList().subscribe(w => {
        this.data_truyen = w;
        this.ds_binh_luan=this.data_truyen

        console.log("------------------");

        for (let i = 0; i < this.ds_binh_luan.length; i++) {
          if (this.ds_binh_luan[i].id === this.message) {
            this.ds_binh_luan_view.push(this.ds_binh_luan[i].cmt)
            console.log(this.ds_binh_luan_view[0]);
            
          }
        }

        this.arr = this.ds_binh_luan_view[0]

        for (let i = 0; i < this.arr.length; i++) {
          this.list_commennt.push(this.arr[i].noi_dung)
        }
        
        
      });
    });

    }


    showCmt(){
      this.appservice.getAllList().subscribe(w => {
        this.data_truyen = w;
        this.ds_binh_luan=this.data_truyen

        console.log("------------------");

        for (let i = 0; i < this.ds_binh_luan.length; i++) {
          if (this.ds_binh_luan[i].id === this.message) {
            this.ds_binh_luan_view.push(this.ds_binh_luan[i].cmt)
            console.log(this.ds_binh_luan_view[0]);
            
          }
        }

        this.arr = this.ds_binh_luan_view[0]

        for (let i = 0; i < this.arr.length; i++) {
          this.list_commennt.push(this.arr[i].noi_dung)
        }
        
        
      });
    }


    submitCmt(){
      // this.t1=this.searchForm.controls['createdFrom'].value;
      // this.cmt = this.searchForm.controls['comment'].value;
      this.comment.cmt = this.searchForm.controls['comment'].value;
      this.comment.id_truyen = this.message;
      console.log(this.comment.cmt);
      console.log(this.message);

      this.appservice.commentTruyen(this.comment).subscribe();
      this.ngOnDestroy();
      this.list_commennt=[];
      this.showCmt();
    }

    initForm() {
      this.searchForm = this.fb.group({
        comment: new FormControl(''),

      })
    }
  logOut(){
    this.router.navigate(['login']);
  }
  subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
