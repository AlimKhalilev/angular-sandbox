import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ELang } from '../data/lang';
import { LANG_STORAGE_KEY } from '../helpers/constants';

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

    /** Объект DOM рендера */
    private renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2, private translate: TranslateService) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    /** Инициализация языков и переводов */
    public init(): void {
        this.translate.addLangs(this.langs);
        this.translate.setDefaultLang(this.defaultLang);
        this.currentLang = localStorage.getItem(LANG_STORAGE_KEY) as ELang || this._currentLang;
    }

    /** Получить текущий язык */
    public get currentLang(): ELang {
        return this._currentLang;
    }

    /** Сменить текущий язык */
    public set currentLang(lang: ELang) {
        this._currentLang = lang;
        this.translate.use(this._currentLang);
        this.renderer.setProperty(document.documentElement, 'lang', this._currentLang);
        localStorage.setItem(LANG_STORAGE_KEY, lang);
    }
}
