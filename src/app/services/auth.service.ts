import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigAPI } from './../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url: string = ConfigAPI.API_ENDPOINT;
  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const userData = sessionStorage.getItem('userData');
    if(userData && userData.length > 0){
      return true;
    }
    return false;
  }

  public login(postData) {
    return this.http.post<any>(this.api_url + '/authenticate', { username: postData.username, password:  postData.password})
    .pipe(map(response => {
      sessionStorage.setItem('userData', JSON.stringify({user: postData.username, token: response.token}));
      return true;
    }));
  }

  public register(postData) {
    return this.http.post<any>(this.api_url + '/register', { username: postData.username, password:  postData.password})
    .pipe(map(response => {
      if(response && response.username) {
        return true;
      } else {
        return false;
      }
    }));
  }

  public async logout() {
    await sessionStorage.removeItem('userData');
    await sessionStorage.clear();
    return true;
  }

  public getToken() {
    return JSON.parse(sessionStorage.getItem('userData'));
  }
}
