// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';
import { NotFoundComponent } from './404/404.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
// Services
import { CookieService } from 'ngx-cookie-service';
import { LocaleService } from './locale.service';
// App router
import { appRoutes } from './app.router';

@NgModule({
	// Modules
	imports: [
		BrowserModule,
		RouterModule.forRoot(
			appRoutes,
			{
				// enableTracing: (process.env.NODE_ENV === 'development'), // <-- debugging purposes only
				useHash: true
			}
		),
		FormsModule,
		HttpModule,
		NgbModule
	],
	/* Components, directives, pipes */
	declarations: [
		// Components
		AppComponent,
		RootComponent,
		NotFoundComponent,
		NavbarComponent,
		HeaderComponent
	],
	providers: [
		CookieService,
		LocaleService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
