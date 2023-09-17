import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, skip, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

/* Обработчик http-запросов для добавления jwt токена */
@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) {}

    /** Добавление токена */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // не подкладываем токен, если отправляем запросы авторизации (логин, регистрация и т.д)
        if (request.url.includes(environment.authEndpoint)) {
            return next.handle(request);
        }
        
        return next.handle(this.getAuthRequest(request)).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) { // Unauthorized (просрочился токен)
                    return this.handleRefreshToken(request, next);
                }
                return this.redirectToLogin(error.message);
            })
        );
    }

    /** Обработка состояния просроченного токена и получения нового через refresh token */
    private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.refreshToken().pipe(
            skip(1), // skip { loading: true }
            switchMap(response => {
                if (response.body && response.body.success && response.body.data.jwt) {
                    this.auth.token = response.body.data.jwt;
                    return next.handle(this.getAuthRequest(request));
                }
                else {
                    return this.redirectToLogin('Попытка получить refresh токен неуспешна');
                }
            }),
            catchError((error: HttpErrorResponse) => {
                return this.redirectToLogin(error.message);
            })
        )
    }

    /** Получить запрос с подстановкой токена авторизации */
    private getAuthRequest(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.auth.token) });
    }

    /** Перенаправить пользователя на страницу логина */
    private redirectToLogin(errorMessage: string) {
        this.router.navigate(['login']);
        return throwError(() => new Error(errorMessage));
    }
}
