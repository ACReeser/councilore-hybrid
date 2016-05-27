import { Component, OnInit } from '@angular/core';
import {NgStyle} from '@angular/common';
import {DecisionService} from '../decision.service';
import {DailyDecision, DecisionResolution, DecisionHistory} from '../models/decision';
import {GameConfig} from '../models/game.config';
import {GameService} from '../game.service';

enum ViewState {
    DecisionList = 0,
    DecisionResolution,
    ExpansionPhase,
    TaxesAndCrime
}

interface Window {
    Math: typeof Math;
}

@Component({
  moduleId: module.id,
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css'],
  providers: [DecisionService],
  directives: [NgStyle]
})
export class GameComponent implements OnInit {
  state: ViewState = ViewState.DecisionList;
  game: GameConfig;
  daily: DailyDecision;
  selectedResolution: DecisionResolution;
  coinStyles = [
        { left: (Math.random()*50 -25), 'animation-delay': Math.random() }, 
        { left: (Math.random()*50 -25), 'animation-delay': Math.random() },
        { left: (Math.random()*50 -25), 'animation-delay': Math.random() }
      ];
  
  constructor(private decSvc: DecisionService, private gameSvc: GameService) {
      this.game = gameSvc.currentGame;
  }

  ngOnInit() {
      this.decSvc.getDailyFeed().subscribe((daily) => {
          this.daily = daily;
      });      
  }
  
  selectResolution(res: DecisionResolution): void{
      this.state = ViewState.DecisionResolution;
      this.selectedResolution = res;
      this.game.history.push(new DecisionHistory(this.daily.id, res.id));
      this.game.city.applyResolution(res);
  }
  
  finishResolution(): void {
      if (this.selectedResolution.allowsExpansionPhase)
      {
        this.state = ViewState.ExpansionPhase;
      }
      else
      {
          this.state = ViewState.TaxesAndCrime;
      }
  }
  
  finishExpansion(){
      this.state = ViewState.TaxesAndCrime;      
  }
  
  finishDay(){
      this.decSvc.askForNextDailyDecision();
      this.state = ViewState.DecisionList;
  }

}
