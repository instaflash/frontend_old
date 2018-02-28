import { Component } from '@angular/core';

interface Logo {
	ref: string;
	size: number; // px
}

@Component({
	selector: 'navbar-component',
	templateUrl: require('./navbar.component.html'),
	styleUrls: [require('./navbar.component.sass')]
})
export class NavarComponent {
	private logo: Logo = {
		ref: require('../../logo/logo.png'),
		size: 50 // px
	};
}
