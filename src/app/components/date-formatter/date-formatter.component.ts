import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-date-formatter',
    templateUrl: './date-formatter.component.html',
    styleUrls: ['./date-formatter.component.scss']
})
export class DateFormatterComponent {
    /** Today date -> 27 августа 2023 */
    todayDate: Date = new Date();

    /** '2023-07-12T14:00:00.000+03:00' -> 12.07.2023 14:00 */
    someDate: string = '2023-07-12T14:00:00.000+03:00';

    /** Гибкая дата из ts файла */
    dateFromTs: string | null = null;

    constructor(private translateService: TranslateService) {
        this.dateFromTs = new DatePipe(this.translateService.currentLang).transform('2023-05-12T17:00:00.000+03:00', 'd MMMM yyyy');
        this.translateService.onLangChange.subscribe(event => {
            this.dateFromTs = new DatePipe(event.lang).transform('2023-05-12T17:00:00.000+03:00', 'd MMMM yyyy');
        });
    }
}
