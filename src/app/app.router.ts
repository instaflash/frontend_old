// Modules
import { Routes } from '@angular/router';
// Components
import { RootComponent } from './root/root.component';
import { NotFoundComponent } from './404/404.component';
// Router
export const appRoutes: Routes = [
	{
		path: '',
		component: RootComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];
