import { Component, OnInit } from '@angular/core';
import {NgStyle, NgIf} from '@angular/common';
import {DecisionService} from '../decision.service';
import {DailyDecision, DecisionResolution, DecisionHistory} from '../models/decision';
import {GameConfig} from '../models/game.config';
import {Building} from '../models/building';
import {GameService} from '../game.service';
import {ShieldpickerComponent} from '../shieldpicker/shieldpicker.component';

enum ViewState {
    DecisionList = 0,
    DecisionResolution,
    PublicExpansionPhase,
    PrivateExpansionPhase,
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
        this.state = ViewState.PublicExpansionPhase;
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
    this.state = ViewState.PrivateExpansionPhase;
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
  candidateBuilding: Building;
  expand(aType: string): void{
      if (this.game.city.treasury >= 5)
      {
          this.expansionModalOpen = !this.expansionModalOpen;
          this.expansionType = aType;
          
          this.candidateBuilding = this.game.city.getUpgradeableBuildingFromStat(this.expansionType);
          
          if (!this.candidateBuilding) {
              this.candidateBuilding = Building.statToBuilding(this.expansionType);
          }
          
          this.expansionHeaderText = "Build a " + this.candidateBuilding.name;
          this.expansionDeltaSrc = this.expansionSrc = "/content/flaticon/svg/"+this.candidateBuilding.statIconSrc+".svg";
          
          this.expansionDelta = this.candidateBuilding.canBeUpgraded ? 2 : 3;
          this.expansionDeltaType = this.candidateBuilding.stat[0].toUpperCase() + this.candidateBuilding.stat.substr(1);
      }
  }
  //todo: break this out to its own component
  build(): void{
    this.game.city.stats.farming.changeValue(this.candidateBuilding.farmingDelta);
    this.game.city.stats.trade.changeValue(this.candidateBuilding.tradeDelta);
    this.game.city.stats.lore.changeValue(this.candidateBuilding.loreDelta);
    this.game.city.stats.society.changeValue(this.candidateBuilding.societyDelta);
    this.game.city.stats.law.changeValue(this.candidateBuilding.lawDelta);
    this.game.city.treasury -= this.candidateBuilding.treasuryCost;
    
    this.game.city.buildings.push(Building.construct(this.candidateBuilding));
    
    this.expansionModalOpen = false;
    this.finishPublicExpansion();
  }
  
  upgrade(): void{
      this.expansionModalOpen = false;      
  }

}
