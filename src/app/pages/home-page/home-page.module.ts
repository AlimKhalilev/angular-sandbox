import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { DateFormatterModule } from '../../components/date-formatter/date-formatter.module';
import { LangSwitcherModule } from '../../components/lang-switcher/lang-switcher.module';
import { ProductModule } from '../../components/product/product.module';

@NgModule({
    declarations: [HomePageComponent],
    imports: [CommonModule, HomePageRoutingModule, DateFormatterModule, LangSwitcherModule, ProductModule]
})
export class HomePageModule {}
