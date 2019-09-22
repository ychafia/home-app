import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userData = this.authService.getToken();
        if (userData) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${userData.token}`
                }
            })
        }

        return next.handle(req);
    }
}