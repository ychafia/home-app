import { Injectable } from '@angular/core';
import { ConfigAPI } from '../config/api.config';
import { Observable, throwError, of } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Epargne } from '../models/epargne';
import { AppLoadService } from './app-load.service';

@Injectable({
  providedIn: 'root'
})
export class MesepargnesService {
  //api_url: string = ConfigAPI.API_ENDPOINT;

  constructor(private http: HttpClient) { }

  public getEpargnes(year: string) : Observable<any> {
    return this.http.get<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/epargnes/'+year).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public addUpdateEpargne(epargne: any, type_epargne: string): Observable<any> {
    epargne.type = type_epargne;
    return this.http.post<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/epargne', epargne).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public deleteEpargne(id: number) : Observable<boolean> {
    return this.http.delete<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/epargne/' + id).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public get_years() : Observable<any>{
    return this.http.get<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/years').pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public get_types_epargnes(year) : Observable<any> {
    return this.http.get<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/types_epargnes/' + year).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public get_totaux_by_type(year) : Observable<any> {
    return this.http.get<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/epargnes/totaux/' + year).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public get_totaux_synthese() {
    return this.http.get<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/epargnes/totaux/').pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public get_totaux_by_year(selectedYear: any) {
    return this.http.get<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/totaux/'+ selectedYear).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public updateTotaux(solde: any, year: any, id_type: any): Observable<any> {
    let _total : any = {solde: solde, year: year, id_type: id_type}
    return this.http.put<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/epargnes/totaux/', _total).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  public addTotaux(solde: any, year: any, id_type: any): Observable<any> {
    let _total : any = {montant: solde, year: year, total_type: id_type}
    return this.http.post<any>(AppLoadService.appConfig.API_ENDPOINT  + '/api/mes-epargnes-api/epargnes/totaux/', _total).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
