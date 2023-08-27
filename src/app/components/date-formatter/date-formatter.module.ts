import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatterComponent } from './date-formatter.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [DateFormatterComponent],
    exports: [DateFormatterComponent],
    imports: [CommonModule, TranslateModule]
})
export class DateFormatterModule {}
