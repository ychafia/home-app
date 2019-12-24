import { ConfigAPI } from './../config/api.config';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { AppLoadService } from './app-load.service';


@Injectable({
  providedIn: 'root'
})
export class ElementService {
  //api_url: string = ConfigAPI.API_ENDPOINT;
  constructor(private http: HttpClient) {
   }

  public getElement() : Observable<any> {
    return this.http.get<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-courses-api/elements').pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public addElement(element) : Observable<any> {
    return this.http.post<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-courses-api/element', element).pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public makeDone(element) {
    return this.http.post<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-courses-api/element', element).pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public deleteElement(id) {
    return this.http.delete<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-courses-api/element/' + id).pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
