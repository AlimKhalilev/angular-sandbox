import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { EHttpMethod, IHttpResponse } from '../data/http-request';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {
    constructor(private http: HttpClient) {}

    /** Отправляет запрос на сервер с опциональными параметрами и проверкой на ошибку запроса */
    public sendHttpRequest<T>(method: EHttpMethod, url: string = '', paramsData: {} = {}): Observable<IHttpResponse<T>> {
        const params = new HttpParams({ fromObject: paramsData });
        switch (method) {
            case EHttpMethod.GET:
                return this.http.get<T>(url, { params: params }).pipe(map(result => ({ body: result })), catchError(this.handleError<T>));
            case EHttpMethod.POST:
                return this.http.post<T>(url, { params: params }).pipe(map(result => ({ body: result })), catchError(this.handleError<T>));
            case EHttpMethod.PUT:
                return this.http.put<T>(url, { params: params }).pipe(map(result => ({ body: result })), catchError(this.handleError<T>));
            case EHttpMethod.DELETE:
                return this.http.delete<T>(url, { params: params }).pipe(map(result => ({ body: result })), catchError(this.handleError<T>));
        }
    }

    /** Отправляет запрос на сервер с обработкой ошибок и возвращает Blob объект */
    public sendHttpRequestBlob(url: string = '', paramsData: {} = {}): Observable<IHttpResponse<Blob>> {
        return this.http.post(url, paramsData, { observe: 'response', responseType: 'blob' }).pipe(
            map((result): IHttpResponse<Blob> => ({ body: result.body ? result.body : undefined })),
            catchError(this.handleError<Blob>)
        );
    }

    /** Метод обработки ошибок http запроса */
    private handleError<T>(error: HttpErrorResponse): Observable<IHttpResponse<T>> {
        if (error.status === 0) {
            // Произошла ошибка на стороне клиента или в сети.
            console.error('Client error:', error.error);
        } else {
            // Серверная часть вернула код неудачного ответа.
            // Тело ответа может содержать подсказки о том, что пошло не так.
            console.error(`Backend error: ${error.status}, details:`, error.error);
        }
        return of({ hasError: true, errorMsg: error.message });
    }
}
