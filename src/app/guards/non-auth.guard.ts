import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Защита маршрутов логина и восстановления пароля от авторизованного доступа.
 */
@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard {
    constructor(private router: Router, private authService: AuthService) {}

    /** Возвращает true, если доступ разрешен */
    canActivate() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

    /** Возвращает true, если доступ разрешен для дочерних роутов */
    canActivateChild() {
        return this.canActivate();
    }
}
