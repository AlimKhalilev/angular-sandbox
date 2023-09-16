import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/** Защита маршрутов от неавторизованного доступа */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private router: Router, private authService: AuthService) {}

    /** Возвращает true, если доступ разрешен */
    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['access-denied']);
        return false;
    }
}