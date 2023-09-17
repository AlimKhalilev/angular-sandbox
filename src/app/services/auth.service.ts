import { Injectable } from '@angular/core';
import { IJwt, ILogin, IRegistration, IRegistrationResponse, IUser } from '../data/auth';
import { HttpRequestService } from './http-request.service';
import { EHttpMethod, IAuthResponse, IHttpResponse } from '../data/http-request';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JWT_TOKEN_STORAGE_KEY, JWT_TOKEN_STORAGE_PAYLOAD } from '../helpers/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpRequestService: HttpRequestService, private helper: JwtHelperService, private router: Router) {}

    /** Авторизации по почте и паролю */
    public login(login: ILogin): Observable<IHttpResponse<IAuthResponse<IJwt>>> {
        return this.httpRequestService.request<IAuthResponse<IJwt>>(EHttpMethod.POST, environment.authEndpoint + '/auth', login);
    }

    /** Выход из учетной записи */
    public logout() {
        this.token = '';
        this.router.navigate(['login']);
    }

    /** Обновить просроченный токен */
    public refreshToken(): Observable<IHttpResponse<IAuthResponse<IJwt>>> {
        return this.httpRequestService.request<IAuthResponse<IJwt>>(EHttpMethod.POST, environment.authEndpoint + '/auth/refresh', {
            JWT: this.token
        });
    }

    /** Регистрация нового пользователя */
    public registration(data: IRegistration): Observable<IHttpResponse<IRegistrationResponse>> {
        return this.httpRequestService.request<IRegistrationResponse>(EHttpMethod.POST, environment.authEndpoint + '/users', data);
    }

    /** Метод проверки аутентификации пользователя */
    public isAuthenticated(): boolean {
        return Boolean(this.token && !this.helper.isTokenExpired(this.token) && this.user && this.user.site === environment.site);
    }

    /** Объект данных пользователя */
    public get user(): IUser | null {
        try {
            return JSON.parse(localStorage.getItem(JWT_TOKEN_STORAGE_PAYLOAD) || '');
        } catch {
            return null;
        }
    }

    /** Получить токен */
    public get token(): string {
        return localStorage.getItem(JWT_TOKEN_STORAGE_KEY) || '';
    }

    /** Установить токен */
    public set token(token: string) {
        localStorage.setItem(JWT_TOKEN_STORAGE_KEY, token);
        localStorage.setItem(JWT_TOKEN_STORAGE_PAYLOAD, JSON.stringify(this.helper.decodeToken(token)));
    }
}
