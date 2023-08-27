import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ProductComponent],
    imports: [CommonModule, TranslateModule],
    exports: [ProductComponent],
})
export class ProductModule {}
