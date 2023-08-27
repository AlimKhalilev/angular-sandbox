import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangSwitcherComponent } from './lang-switcher.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [LangSwitcherComponent],
    imports: [CommonModule, FormsModule, TranslateModule],
    exports: [LangSwitcherComponent]
})
export class LangSwitcherModule {}
