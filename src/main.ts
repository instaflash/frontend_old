import './common.sass';
import 'bootstrap';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/util';
import 'jquery';
import 'popper.js';
import {
	enableProdMode,
	TRANSLATIONS,
	TRANSLATIONS_FORMAT,
	LOCALE_ID,
	MissingTranslationStrategy
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
const isProd: boolean = process.env.NODE_ENV === 'development';
if (isProd) { enableProdMode(); }

/** Polyfills */
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
if (isProd) { Error.stackTraceLimit = Infinity; } require('zone.js/dist/long-stack-trace-zone');

// Default language
const DEFAULT_LANG = 'ru';

// Change language
type languages = 'kz' | 'ru';
function change_lang(value: languages) {
	options.providers[0].useValue = require(`raw-loader!./locales/messages.${value}.xlf`);
	options.providers[1].useValue = value;
	platformBrowserDynamic().bootstrapModule(AppModule, options);
} // change_lang('kz');

const options = {
	missingTranslation: MissingTranslationStrategy.Error,
	providers: [
		{
			provide: TRANSLATIONS,
			useValue: require(`raw-loader!./locales/messages.${DEFAULT_LANG}.xlf`)
		},
		{
			provide: LOCALE_ID,
			useValue: DEFAULT_LANG
		},
		{
			provide: TRANSLATIONS_FORMAT,
			useValue: 'xlf'
		}
	]
};
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule, options);
