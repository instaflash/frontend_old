// Common styles
import './common.sass';
// Polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
if (process.env.ENV === 'development') {
	Error['stackTraceLimit'] = Infinity;
	require('zone.js/dist/long-stack-trace-zone');
}
// Angular
import { enableProdMode } from '@angular/core';
if (process.env.NODE_ENV === 'production') {
	enableProdMode();
}
/******************************************************************/
// Angular application
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
