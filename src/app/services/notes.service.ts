import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigAPI } from './../config/api.config';
import { Observable, of, throwError } from 'rxjs';
import { Note } from './../models/note';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  api_url: string = ConfigAPI.API_ENDPOINT;
  constructor(private http: HttpClient) {
   }

  getNotes() : Observable<Note[]>{
    return this.http.get<any>(this.api_url + '/api/mes-notes-api/notes').pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getNoteById(id: number) : Observable<Note>{
    return this.http.get<any>(this.api_url + '/api/mes-notes-api/notes/'+id).pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addNote(note: Note) : Observable<any> {
    return this.http.post<any>(this.api_url + '/api/mes-notes-api/note', note).pipe(
      tap(data => console.log('Tap: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteNote(id: number) : Observable<any> {
    return this.http.delete<any>(this.api_url + '/api/mes-notes-api/note/' + id).pipe(
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
