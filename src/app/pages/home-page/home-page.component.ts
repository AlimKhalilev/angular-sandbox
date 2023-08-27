import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    constructor(public productsService: ProductsService) {}

    ngOnInit(): void {
        this.productsService.loadProducts();
    }
}
