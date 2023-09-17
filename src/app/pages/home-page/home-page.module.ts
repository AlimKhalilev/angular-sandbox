import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SanitizeHtmlPipeModule } from '../../pipes/sanitize-html.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [HomePageComponent],
    imports: [CommonModule, HomePageRoutingModule, SanitizeHtmlPipeModule, FormsModule]
})
export class HomePageModule {}
