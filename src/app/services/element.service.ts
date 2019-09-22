import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ElementService {
  userData;
  httpOptions = {
    headers: new HttpHeaders({
      
    })
  };
  
  constructor(private http: HttpClient) {
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
   }

  public getElement() : Observable<any> {
    return this.http.get<any>('http://localhost:9090/elementsapi/elements');
  }

  public addElement() : Observable<any> {
    let element = {
      "libelle": "Sal3",
      "salaire": 300,
      "mois": "Janv-1"
    }
    return this.http.post<Element[]>('http://localhost:9090/elementsapi/elements', element);
  }
}
