import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
@Component({
	selector: '#app-root',
	templateUrl: require('./app.component.html'),
	styleUrls: [require('./app.component.sass')],
})
export class AppComponent {
	private ngOnInit() {
		console.log('Initialized');
	}
}
