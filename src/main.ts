import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { NgCounciloreAppComponent, environment } from './app/';
import { MenuComponent } from './app/menu/menu.component';
import {
  Location,
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrap(NgCounciloreAppComponent, [
  provide(APP_BASE_HREF, { useValue: '#' }),
  provide(LocationStrategy,{ useClass: HashLocationStrategy})
  ]);
