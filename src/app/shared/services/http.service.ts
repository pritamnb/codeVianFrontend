import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, ) { }

  get(endPoint: string, data: any = {}) {
    return this.http.get(endPoint).pipe(
      map(res => {
        if (res) {
        }
        return res;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  post(endPoint: string, data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(endPoint, body).pipe(
      map(res => {
        if (res) {

        }
        return res;
      }),
      catchError((error: any) => {

        return throwError(error);
      })
    );
  }

  put(endPoint: string, data: any): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put(endPoint, body).pipe(
      map(res => {
        if (res) {
          // alert('In put');

        }
        return res;
      }),
      catchError((error: any) => {

        // alert('Error');
        return throwError(error);
      })
    );
  }

  delete(endPoint: string, data: any): Observable<any> {
    // this.loaderService.show();
    // this.loaderService.updateLoader();
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      headers: headers,
      body: JSON.stringify(data)
    };
    return this.http.delete(endPoint, body).pipe(
      map(res => {
        if (res) {

        }
        return res;
      }),
      catchError((error: any) => {


        return throwError(error.error.error);
      })
    );
  }
}
