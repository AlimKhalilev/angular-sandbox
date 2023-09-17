import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    constructor(public productsService: ProductsService, private authService: AuthService) {}

    ngOnInit(): void {
        this.productsService.loadProducts();
    }

    logout() {
        this.authService.logout();
    }
}
