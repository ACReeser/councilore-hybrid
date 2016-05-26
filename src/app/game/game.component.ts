import { Component, OnInit } from '@angular/core';
import {DecisionService} from '../decision.service';
import {DailyDecision} from '../models/decision';
import {GameConfig} from '../models/game.config';
import {GameService} from '../game.service';

@Component({
  moduleId: module.id,
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css'],
  providers: [DecisionService]
})
export class GameComponent implements OnInit {

  game: GameConfig;
  daily: DailyDecision;
  constructor(private decSvc: DecisionService, private gameSvc: GameService) {
      this.game = gameSvc.currentGame;
  }

  ngOnInit() {
      this.decSvc.getDailyFeed().subscribe((daily) => {
          this.daily = daily;
      });      
  }
  
  finishDay(){
      this.decSvc.askForNextDailyDecision();
  }

}
