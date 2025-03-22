import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken'); // Lấy token từ localStorage


    // Danh sách các API không cần token (ví dụ: API login)
    const excludedUrls = ['authorization-service/login', 'authorization-service/register',
                          '/course-service/file/createCourse', '/course-service/file/listCourse',
                          // '/authorization-service/delete-user-by-username'
    ];

    // Kiểm tra nếu API thuộc danh sách cần loại bỏ token 
    const isExcluded = excludedUrls.some(url => request.url.includes(url)); 


    // Kiểm tra nếu request là API của BE
    if (accessToken && !isExcluded) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
