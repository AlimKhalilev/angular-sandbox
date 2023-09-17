import { Component } from '@angular/core';
import { LangService } from './services/lang.service';
import { Routes } from '@angular/router';
import { routes } from './app-routing.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /** Список всех роутов приложения */
    appRoutes: Routes = routes.filter(route => route.redirectTo === undefined);

    constructor(private langService: LangService) {
        this.langService.init();
    }
}
