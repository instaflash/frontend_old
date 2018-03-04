import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LocaleService {
	default_locale: string = 'ru';
	dict: any = {
		ru: {
			company_name: 'InstaFlash',
			navbar_item_1: 'Возможности',
			navbar_item_2: 'Инструкция',
			navbar_item_3: 'Правила',
			navbar_item_4: 'Попробовать',
			navbar_item_5: 'Войти',
			header_title: 'Клиенты за один клик',
			header_text: 'InstaFlash - это сервис по продвижению в инстаграме, который умеет автоматически лайкать, комментировать, подписаться и отписаться по хэштегам и геометкам. Собирайте до 5000 постоянных клиентов.'
		}
	};
	constructor(private cookieService: CookieService) { }
	getDict() {
		const locale = this.cookieService.get('locale') || this.default_locale;
		const dict = this.dict[locale];
		// If cookie:locale value is undefined in "this.dict".
		return dict || this.dict[this.default_locale];
	}
	changeLocale(locale?: string) {
		locale = locale || this.default_locale;
		this.cookieService.set('locale', locale);
		window.location.reload();
		return true;
	}
}
