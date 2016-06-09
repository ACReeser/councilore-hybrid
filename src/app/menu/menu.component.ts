import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {GameService} from '../game.service'


@Component({
  moduleId: module.id,
  selector: 'councilore-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class MenuComponent implements OnInit {

  hasSavedGame: boolean;
  
  constructor(private router: Router, private gameSvc: GameService) {}

  ngOnInit() {
      this.hasSavedGame = this.gameSvc.hasSavedGame();
  }
  
  resume(){
      if (this.hasSavedGame)
      {
        this.gameSvc.loadLast();
        this.router.navigate(['/game']);          
      }
  }

}
