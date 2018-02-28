import { Component } from '@angular/core';

interface Typography {
	title: string;
	blockquote: string;
	image: string;
}

@Component({
	selector: 'header-component',
	templateUrl: require('./header.component.html'),
	styleUrls: [require('./header.component.sass')]
})
export class HeaderComponent {
	private typo: Typography = {
		title: 'Клиенты за один клик',
		blockquote: '',
		image: require('../../img/header_img/source.png')
	};
}
