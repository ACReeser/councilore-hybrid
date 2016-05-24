import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NgCounciloreAppComponent, environment } from './app/';
import { MenuComponent } from './app/menu/menu.component';

if (environment.production) {
  enableProdMode();
}

bootstrap(NgCounciloreAppComponent);
