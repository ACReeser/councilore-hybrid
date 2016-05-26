import { Component, OnInit } from '@angular/core';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {GameComponent} from './game/game.component';
import {NewgameComponent} from './newgame/newgame.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { GameService } from './game.service';

@Routes([
  { path: "/menu",     
    component: MenuComponent,  }, 
  { path: "/new",     
    component: NewgameComponent }, 
  { path: "/game", 
    component: GameComponent }
])
@Component({
  moduleId: module.id,
  selector: 'ng-councilore-app',
  templateUrl: 'ng-councilore.component.html',
  styleUrls: ['ng-councilore.component.css'],  
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, GameService]
})
export class NgCounciloreAppComponent implements OnInit {
  title = 'Councilore';
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.navigate(['/menu']);
  }
}
