import { Component, OnInit } from '@angular/core';
import {ChargesService, ChargeDictionary} from '../charges.service';
//import {OrderBy} from '../order-by.pipe'
import { Router } from '@angular/router';
import {City} from '../models/city';
import {GameConfig} from '../models/game.config';
import {GameService} from '../game.service';
import {ShieldpickerComponent} from '../shieldpicker/shieldpicker.component';

enum SortBy { Element = 0, Category }

@Component({
  moduleId: module.id,
  selector: 'app-newgame',
  templateUrl: 'newgame.component.html',
  styleUrls: ['newgame.component.css'],
  providers: [ChargesService],
  directives: [ShieldpickerComponent]
  //pipes: [OrderBy]
})
export class NewgameComponent implements OnInit {

  constructor(private chargeSvc: ChargesService, private router: Router, private gameSvc: GameService) {}

  metadata: ChargeDictionary;
  charges: string[];
  currentSort: SortBy = SortBy.Element;
  currentIndex = 0;
  newGame: GameConfig = GameConfig.CreateNew();
  invalidName: boolean;
  
  ngOnInit() {
      this.metadata = this.chargeSvc.charges;
      this.charges = Object.keys(this.chargeSvc.charges);
      this.sort();
  }
  sort() {
      this.charges.sort((a: string, b: string) => {
          if (this.currentSort == SortBy.Category)
          {
              if (this.metadata[a].category == this.metadata[b].category)
                return 0;
              else
                return (this.metadata[a].category > this.metadata[b].category) ? 1 : -1; 
          }
          else
          {
              if (this.metadata[a].element == this.metadata[b].element)
                return 0;
              else
                return (this.metadata[a].element > this.metadata[b].element) ? 1 : -1;              
          }
      });
  }
  setSort(sort: SortBy){
      this.currentSort = sort;
      this.sort();
  }
  select(charge: string){
      this.newGame.city.quadrants[this.currentIndex] = charge;
      this.currentIndex++;
      if (this.currentIndex > 3)
        this.currentIndex = 0;
  }
  finish(){
      if (this.newGame.city.name == null || this.newGame.city.name == "") {
          this.invalidName = true;
          return;
      }
      this.currentIndex = -1;
      this.gameSvc.currentGame = this.newGame;
      this.gameSvc.save();
      this.router.navigate(['/game']);
  }
}
