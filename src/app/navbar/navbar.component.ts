// Components
import { Component } from '@angular/core';
// Services
import { LocaleService } from '../locale.service';
// Interfaces
interface Logo {
	ref: string; // reference
	size: number; // px
}

@Component({
	selector: 'navbar-component',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
	private logo: Logo = {
		ref: require('../../logo/logo.png'),
		size: 50 // px
	};
	dict: any;
	constructor(private localeService: LocaleService) {
		this.dict = this.localeService.getDict();
	}
}
