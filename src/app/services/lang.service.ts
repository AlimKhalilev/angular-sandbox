import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ELang } from '../data/lang';

@Injectable({
    providedIn: 'root'
})
export class LangService {
    /** Список языков приложения */
    public langs: ELang[] = [ELang.EN, ELang.RU];
    
    /** Дефолтный язык приложения */
    public defaultLang: ELang = ELang.EN;

    /** Текущий язык приложения */
    private _currentLang: ELang = this.defaultLang;

    /** Ключ для обращения к localStorage */
    private langStorageKey: string = 'app_lang';

    /** Объект DOM рендера */
    private renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2, private translate: TranslateService) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    /** Инициализация языков и переводов */
    public init() {
        this.translate.addLangs(this.langs);
        this.translate.setDefaultLang(this.defaultLang);
        this.currentLang = localStorage.getItem(this.langStorageKey) as ELang || this._currentLang;
    }

    /** Получить текущий язык */
    get currentLang() {
        return this._currentLang;
    }

    /** Сменить текущий язык */
    set currentLang(lang: ELang) {
        this._currentLang = lang;
        this.translate.use(this._currentLang);
        this.renderer.setProperty(document.documentElement, 'lang', this._currentLang);
        localStorage.setItem(this.langStorageKey, lang);
    }
}
