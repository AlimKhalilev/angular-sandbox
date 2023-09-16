import { Injectable } from '@angular/core';
import { IAuthResponse, ILogin, IUser } from '../data/auth';
import { HttpRequestService } from './http-request.service';
import { EHttpMethod } from '../data/http-request';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

export const JWT_TOKEN_KEY = 'app_access_token';
export const JWT_TOKEN_PAYLOAD = 'app_access_token_payload';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    /** Payload данные токена (данные пользователя) */
    private _tokenPayload: string = '';

    constructor(private httpRequestService: HttpRequestService, private helper: JwtHelperService) {}

    /** Метода авторизации по почте и паролю */
    public login(loginPayload: ILogin) {
        this.httpRequestService.sendHttpRequest<IAuthResponse>(EHttpMethod.POST, environment.loginEndpoint, loginPayload).subscribe(response => {
            if (response.body && response.body.success) {
                this.token = response.body.data.jwt;
            }
        })
    }

    /** Метод проверки аутентификации пользователя */
    public isAuthenticated(): boolean {
        return Boolean(this.token && !this.helper.isTokenExpired(this.token) && this.user && this.user.site === environment.site);
    }

    /** Объект данных пользователя */
    public get user(): IUser | undefined {
        try {
            return JSON.parse(this._tokenPayload);
        }
        catch {
            return undefined;
        }
    }

    /** Получить токен */
    public get token(): string {
        return localStorage.getItem(JWT_TOKEN_KEY) || '';
    }

    /** Установить токен */
    public set token(token: string) {
        localStorage.setItem(JWT_TOKEN_KEY, token);

        const user: IUser | null = this.helper.decodeToken(token);
        if (user !== null) {
            this._tokenPayload = JSON.stringify(user);
            localStorage.setItem(JWT_TOKEN_PAYLOAD, this._tokenPayload);
        }
    }
}
