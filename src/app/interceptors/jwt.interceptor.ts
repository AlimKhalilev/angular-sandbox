import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/* Обработчик http-запросов для добавления jwt токена */
@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    /** Добавление токена */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
        const httpRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.auth.token)
        });
        return next.handle(httpRequest);
    }
}
