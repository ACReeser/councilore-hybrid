import { Component, OnInit } from '@angular/core';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {GameComponent} from './game/game.component';
import {HowToPlayComponent} from './howtoplay/howtoplay.component';
import {AboutComponent} from './about/about.component';
import {NewgameComponent} from './newgame/newgame.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { GameService } from './game.service';
import { StorageService } from './storage.service';

@Routes([
  { path: "/",     
    component: MenuComponent,  }, 
  { path: "/new",     
    component: NewgameComponent }, 
  { path: "/game", 
    component: GameComponent },
  { path: "/howtoplay", 
    component: HowToPlayComponent },
  { path: "/about", 
    component: AboutComponent }
])
@Component({
  moduleId: module.id,
  selector: 'ng-councilore-app',
  templateUrl: 'ng-councilore.component.html',
  styleUrls: ['ng-councilore.component.css'],  
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, GameService, StorageService]
})
export class NgCounciloreAppComponent implements OnInit {
  title = 'Councilore';
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate(['/']);
  }
}
