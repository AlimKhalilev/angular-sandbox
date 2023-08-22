import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    /** Текущая дата */
    currentDate: string = '';

    constructor() {}

    ngOnInit(): void {
        console.log(DateTime.fromISO('2023-07-12T14:00:00.000+03:00').toFormat('dd.MM.yyyy HH:mm'));
        
        /** '2023-03-23T17:00' -> 23 марта 2023 */
        console.log(DateTime.fromISO('2023-07-12T14:00:00.000+03:00').setLocale('ru-RU').toFormat('dd MMMM yyyy'));
    }
}
