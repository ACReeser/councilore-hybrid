import { Component, OnInit } from '@angular/core';
import {DecisionService} from '../decision.service'
import {DailyDecision} from '../models/decision'

export class Game {
    day: number;
}

@Component({
  moduleId: module.id,
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css'],
  providers: [DecisionService]
})
export class GameComponent implements OnInit {

  game: Game;
  daily: DailyDecision;
  constructor(private decSvc: DecisionService) {
      this.game = new Game();
      this.game.day = 1;
      this.getDaily();
  }

  ngOnInit() {
      this.decSvc.DailyDecision.subscribe((daily) => this.daily = daily);      
  }
  
  getDaily(){
      this.decSvc.askForNextDailyDecision();
  }

}
