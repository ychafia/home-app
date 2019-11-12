import { Injectable } from '@angular/core';
import { ConfigAPI } from '../config/api.config';
import { Observable, throwError, of } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesepargnesService {
  api_url: string = ConfigAPI.API_ENDPOINT;
  constructor(private http: HttpClient) { }
  data = [
    {
       "type": "Livret A",
      "epargnes": [
         {"id_epargne": 1, "date_epargne": "10/10/2019", "montant_epargne": 1500, "motif_epargne":"test1"},
         {"id_epargne": 2, "date_epargne": "10/10/2019", "montant_epargne": -100, "motif_epargne":"test2"},
         {"id_epargne": 3, "date_epargne": "10/10/2019", "montant_epargne": 2000, "motif_epargne":"test3"},
         {"id_epargne": 4, "date_epargne": "10/10/2019", "montant_epargne": -250, "motif_epargne":"test4"}
       ]
    },
    {
       "type": "PEL 1",
      "epargnes": [
         {"id_epargne": 1, "date_epargne": "10/10/2019", "montant_epargne": 500, "motif_epargne":"test1"},
         {"id_epargne": 2, "date_epargne": "10/10/2019", "montant_epargne": -10, "motif_epargne":"test2"},
         {"id_epargne": 3, "date_epargne": "10/10/2019", "montant_epargne": 200, "motif_epargne":"test3"},
         {"id_epargne": 4, "date_epargne": "10/10/2019", "montant_epargne": -250, "motif_epargne":"test4"}
       ]
    },
    {
       "type": "PEL 2",
      "epargnes": [
         {"id_epargne": 1, "date_epargne": "10/10/2019", "montant_epargne": 400, "motif_epargne":"test1"},
         {"id_epargne": 2, "date_epargne": "10/10/2019", "montant_epargne": 10, "motif_epargne":"test2"},
         {"id_epargne": 3, "date_epargne": "10/10/2019", "montant_epargne": 200, "motif_epargne":"test3"},
         {"id_epargne": 4, "date_epargne": "10/10/2019", "montant_epargne": 250, "motif_epargne":"test4"}
       ]
    },
    {
       "type": "Assurance vie",
      "epargnes": [
         {"id_epargne": 1, "date_epargne": "10/10/2019", "montant_epargne": 400, "motif_epargne":"test1"},
         {"id_epargne": 2, "date_epargne": "10/10/2019", "montant_epargne": 10, "motif_epargne":"test2"},
         {"id_epargne": 3, "date_epargne": "10/10/2019", "montant_epargne": 200, "motif_epargne":"test3"},
         {"id_epargne": 4, "date_epargne": "10/10/2019", "montant_epargne": 250, "motif_epargne":"test4"}
       ]
    }
  ];
  public getEpargnes() : Observable<any> {
    /*return this.http.get<any>('stubs/epargnes.json').pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );*/
    return of(this.data);
  }

  public getTotaux() : Observable<any> {
    let data = [
      {"total_debit" : 500, "total_credit" : 2000}
    ];
    return of(data);
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
