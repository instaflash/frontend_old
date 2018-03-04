import { Component } from '@angular/core';

@Component({
	templateUrl: './404.component.html',
	styleUrls: ['./404.component.sass']
})
export class NotFoundComponent {
	constructor() {
		document.title = 'Not found';
	}
}
