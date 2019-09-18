import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const userData = sessionStorage.getItem('userData');
    if(userData && userData.length > 0){
      return true;
    }
    return false;
  }

  public login(postData) {
    return this.http.post<any>('http://localhost:9090/authenticate', { username: postData.username, password:  postData.password})
    .pipe(map(response => {
      sessionStorage.setItem('userData', JSON.stringify({user: postData.username, token: response.token}));
      return true;
    }));

  }
}
