import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IRegistration } from '../../data/auth';
import { Router } from '@angular/router';
import { JWT_AUTH_KEY } from '../../helpers/constants';

@Component({
    selector: 'app-registration-page',
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
    /** Объект регистрации */
    public registrationData: IRegistration = {
        email: 'niko@mail.ru',
        password: '123456',
        user_login: 'niko',
        first_name: 'Нико',
        last_name: 'Чемп',
        auth_key: JWT_AUTH_KEY
    };

    /** Флаг загрузки */
    public loading: boolean = false;

    /** Сообщение ошибки */
    public errorMsg: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    registration() {
        this.authService.registration(this.registrationData).subscribe(response => {
            if (response.loading) {
                this.loading = true;
            }
            else {
                if (response.body && response.body.success && response.body.jwt) {
                    this.authService.token = response.body.jwt;
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
