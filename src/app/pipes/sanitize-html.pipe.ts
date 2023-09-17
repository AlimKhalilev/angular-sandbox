import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtmlPipe implements PipeTransform {
    constructor(private _sanitizer: DomSanitizer) {}

    transform(value: string): SafeHtml {
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
}

@NgModule({
    declarations: [SanitizeHtmlPipe],
    imports: [],
    exports: [SanitizeHtmlPipe]
})
export class SanitizeHtmlPipeModule {}