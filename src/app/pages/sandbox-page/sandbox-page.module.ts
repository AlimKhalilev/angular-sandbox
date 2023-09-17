import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxPageRoutingModule } from './sandbox-page-routing.module';
import { SandboxPageComponent } from './sandbox-page.component';
import { DateFormatterModule } from '../../components/date-formatter/date-formatter.module';
import { LangSwitcherModule } from '../../components/lang-switcher/lang-switcher.module';

@NgModule({
    declarations: [SandboxPageComponent],
    imports: [CommonModule, SandboxPageRoutingModule, DateFormatterModule, LangSwitcherModule]
})
export class SandboxPageModule {}
