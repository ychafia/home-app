import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ElementService {
  
  constructor(private http: HttpClient) {
   }

  public getElement() : Observable<any> {
    return this.http.get<any>('http://localhost:9090/elementsapi/elements').pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public addElement(element) : Observable<any> {
    return this.http.post<any>('http://localhost:9090/elementsapi/element', element).pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public makeDone(element) {
    return this.http.post<any>('http://localhost:9090/elementsapi/element', element).pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public deleteElement(id) {
    return this.http.delete<any>('http://localhost:9090/elementsapi/element/' + id).pipe(
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