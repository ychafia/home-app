import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ElementService {
  
  constructor(private http: HttpClient) {
   }

  public getElement() : Observable<any> {
    return this.http.get<any>('http://localhost:9090/elementsapi/elements');
  }

  public addElement(element) : Observable<any> {
    return this.http.post<any>('http://localhost:9090/elementsapi/element', element);
  }

  public makeDone(element) {
    return this.http.post<any>('http://localhost:9090/elementsapi/element', element);
  }

  public deleteElement(id) {
    return this.http.delete<any>('http://localhost:9090/elementsapi/element/' + id);
  }
}
