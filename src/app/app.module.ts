import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { JWT_TOKEN_KEY } from './services/auth.service';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { JwtTokenInterceptor } from './interceptors/jwt.interceptor';

registerLocaleData(localeRu, 'ru');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export const jwtOptionsFactory = () => ({
    tokenGetter: () => localStorage.getItem(JWT_TOKEN_KEY),
    whitelisteDomains: [''],
});

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: []
            }
        })
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
