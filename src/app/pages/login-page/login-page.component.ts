import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../data/auth';
import { Router } from '@angular/router';
import { JWT_AUTH_KEY } from '../../helpers/constants';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
    /** Объект логина */
    public loginData: ILogin = { email: 'user@mail.ru', password: '6*Wc28e!o81d^NTwJVzYMT82', auth_key: JWT_AUTH_KEY };

    /** Флаг загрузки */
    public loading: boolean = false;

    /** Сообщение ошибки */
    public errorMsg: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    public login() {
        this.authService.login(this.loginData).subscribe((response) => {
            if (response.loading) {
                this.loading = true;
            } else {
                if (response.body && response.body.success && response.body.data.jwt) {
                    this.authService.token = response.body.data.jwt;
                    this.router.navigate(['home']);
                }
                if (response.errorData) {
                    this.errorMsg = response.errorData['data'].message ?? 'Ошибка';
                }
                this.loading = false;
            }
        });
    }
}
