// Components
import { Component } from '@angular/core';
// Services
import { LocaleService } from '../locale.service';

@Component({
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.sass']
})
export class RootComponent {
	dict: any;
	constructor(private localeService: LocaleService) {
		this.dict = this.localeService.getDict();
		document.title = this.dict.company_name;
	}
}
