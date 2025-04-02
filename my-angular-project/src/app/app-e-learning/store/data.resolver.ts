// data.resolver.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataService } from './ data.service';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<any[]> {
  constructor(private appService: AppService) {}
   
    resolve() {
        return this.appService.listTeacher(); //
      }
    
}