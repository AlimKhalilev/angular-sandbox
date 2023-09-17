import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, OperatorFunction, retry, Subscriber } from 'rxjs';
import { EHttpMethod, IHttpResponse } from '../data/http-request';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {
    constructor(private http: HttpClient) {}

    /** Отправляет запрос на сервер с опциональными параметрами и проверкой на ошибку запроса */
    public sendHttpRequest<T>(method: EHttpMethod, url: string = '', params: {} = {}): Observable<IHttpResponse<T>> {
        const queryParams: HttpParams = new HttpParams({ fromObject: params });
        let request: Observable<IHttpResponse<T>> = new Observable();

        switch (method) {
            case EHttpMethod.GET:
                request = this.http.get<T>(url, { params: queryParams }).pipe(
                    this.mapResponse<T>(),
                    retry({ count: 0, delay: 500 }),
                    catchError(this.handleError<T>)
                );
                break;
            case EHttpMethod.POST:
                request = this.http.post<T>(url, params).pipe(
                    this.mapResponse<T>(),
                    retry({ count: 0, delay: 500 }),
                    catchError(this.handleError<T>)
                );
                break;
            case EHttpMethod.PUT:
                request = this.http.put<T>(url, params).pipe(
                    this.mapResponse<T>(),
                    retry({ count: 0, delay: 500 }),
                    catchError(this.handleError<T>)
                );
                break;
            case EHttpMethod.DELETE:
                request = this.http.delete<T>(url, params).pipe(
                    this.mapResponse<T>(),
                    retry({ count: 0, delay: 500 }),
                    catchError(this.handleError<T>)
                );
                break;
        }

        return new Observable((subscriber: Subscriber<IHttpResponse<T>>) => {
            subscriber.next({ loading: true });
            request.subscribe(response => {
                subscriber.next(response);
                subscriber.complete();
            })
        });
    }

    /** Отправляет запрос на сервер с обработкой ошибок и возвращает Blob объект */
    public sendHttpRequestBlob(url: string = '', paramsData: {} = {}): Observable<IHttpResponse<Blob>> {
        return new Observable((subscriber: Subscriber<IHttpResponse<Blob>>) => {
            subscriber.next({ loading: true });
            this.http.post(url, paramsData, { observe: 'response', responseType: 'blob' }).pipe(
                map((result): IHttpResponse<Blob> => ({ body: result.body ? result.body : undefined })),
                catchError(this.handleError<Blob>)
            ).subscribe(response => {
                subscriber.next(response);
                subscriber.complete();
            })
        });
    }

    /** Метод обработки ответа запроса */
    private mapResponse<T>(): OperatorFunction<T, IHttpResponse<T>> {
        return map((result: T) => {
            // some code
            return { body: result }
        })
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
        return of<IHttpResponse<T>>({ hasError: true, errorMsg: error.message, errorData: error.error });
    }
}
