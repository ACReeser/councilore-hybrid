import { Component, OnInit } from '@angular/core';
import {NgStyle, NgIf} from '@angular/common';
import {DecisionService} from '../decision.service';
import {DailyDecision, DecisionResolution, DecisionHistory} from '../models/decision';
import {GameConfig} from '../models/game.config';
import {GameService} from '../game.service';
import {ShieldpickerComponent} from '../shieldpicker/shieldpicker.component';

enum ViewState {
    DecisionList = 0,
    DecisionResolution,
    ExpansionPhase,
    TaxesAndCrime,
    EndOfDay,
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
  directives: [NgStyle, ShieldpickerComponent, NgIf]
})
export class GameComponent implements OnInit {
  state: ViewState = ViewState.DecisionList;
  game: GameConfig;
  daily: DailyDecision;
  selectedResolution: DecisionResolution;
  taxCollected: number = 0;
  coinStyles = [
        { left: (Math.random()*50 -25), 'animation-delay': Math.random() }, 
        { left: (Math.random()*50 -25), 'animation-delay': Math.random() },
        { left: (Math.random()*50 -25), 'animation-delay': Math.random() }
      ];
  expansionModalOpen: boolean = false;
  canUpgrade: boolean = false;
  iToAF = {
    0: 'A', 
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F', 
  };

  constructor(private decSvc: DecisionService, private gameSvc: GameService) {
      this.game = gameSvc.currentGame;
      this.canUpgrade = false;
  }


  ngOnInit() {
      this.decSvc.getDailyFeed().subscribe((daily) => {
          this.daily = daily;
          for (var i = 0; i < this.daily.resolutions.length; i++) {
              var res = this.daily.resolutions[i];
              res.assignRequirements(this.game.city);
          }
      });      
  }
  addGold(){
      this.game.city.treasury += 1;
  }
  selectResolution(res: DecisionResolution): void{
      if (res.disabled)
        return;
        
      this.state = ViewState.DecisionResolution;
      this.selectedResolution = res;
      this.game.history.push(new DecisionHistory(this.daily.id, res.id));
      this.game.city.applyResolution(res);
      this.gameSvc.save();
  }
  
  finishResolution(): void {
      if (this.selectedResolution.allowsExpansionPhase)
      {
        this.state = ViewState.ExpansionPhase;
      }
      else
      {
          this.moveToTaxes();
      }
      this.gameSvc.save();
  }
  
  moveToTaxes(): void{
    this.state = ViewState.TaxesAndCrime;
    this.taxCollected = this.game.city.collectTaxes(); 
    this.gameSvc.save();
  }
  
  moveToEndOfDay(): void{
    this.state = ViewState.EndOfDay;      
  }
  finishPublicExpansion(){

  }
  finishExpansion(){
      this.moveToTaxes();
      this.gameSvc.save();
  }
  
  finishDay(){
      this.decSvc.askForNextDailyDecision();
      this.state = ViewState.DecisionList;
  }

  expansionType: string;
  expansionHeaderText: string;
  expansionSrc: string;
  expansionDeltaSrc: string;
  expansionDelta: number;
  expansionDeltaType: string;
  expand(aType: string): void{
      if (this.game.city.treasury >= 5)
      {
          this.expansionModalOpen = !this.expansionModalOpen;
          this.expansionType = aType;
          this.expansionHeaderText = "Build a Farm";
          this.expansionSrc = "/content/flaticon/svg/food.svg";
          this.expansionDeltaSrc = "/content/flaticon/svg/food.svg";
          this.expansionDelta = 2;
          this.expansionDeltaType = "Farming";
      }
  }
  //todo: break this out to its own component
  build(): void{
      switch(this.expansionType) {
          case "farming":
          this.game.city.stats.farming.changeValue(this.expansionDelta);
          this.game.city.treasury -= 5;
          break; 
      }

      this.expansionModalOpen = false;
      this.finishPublicExpansion();
  }
  
  upgrade(): void{
      this.expansionModalOpen = false;      
  }

}
