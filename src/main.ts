import './common.sass';
import 'bootstrap';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/util';
import 'jquery';
import 'popper.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
const isProd: boolean = process.env.NODE_ENV === 'development';
if (isProd) { enableProdMode(); }

import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
if (isProd) { Error.stackTraceLimit = Infinity; } require('zone.js/dist/long-stack-trace-zone');

import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
