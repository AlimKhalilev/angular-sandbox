import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
    selector: 'app-lang-switcher',
    templateUrl: './lang-switcher.component.html',
    styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent {
    constructor(public langService: LangService) {}
}
