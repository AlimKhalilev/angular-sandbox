import { Component, Input } from '@angular/core';
import { IProduct } from '../../data/product';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    /** Объект продукта */
    @Input() product?: IProduct;

    constructor() {}
}
