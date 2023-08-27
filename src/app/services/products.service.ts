import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EHttpMethod, IHttpResponse } from '../data/http-request';
import { IProduct } from '../data/product';
import { HttpRequestService } from './http-request.service';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    /** Объект результата запроса получения продуктов */
    productsResponse$: BehaviorSubject<IHttpResponse<IProduct[]>> = new BehaviorSubject<IHttpResponse<IProduct[]>>({});

    constructor(private httpRequestService: HttpRequestService) {}

    /** Загрузить продукты */
    loadProducts(): void {
        if (!this.productsResponse$.value.body) {
            this.productsResponse$.next({ loading: true });
            this.httpRequestService.sendHttpRequest<IProduct[]>(EHttpMethod.GET, environment.serverEndpoint + 'products').subscribe(response => {
                this.productsResponse$.next(response);
            });
        }
    }
}
