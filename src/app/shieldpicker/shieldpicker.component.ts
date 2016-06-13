import { Component, OnInit, Input } from '@angular/core';
import {GameConfig} from '../models/game.config';
import {ChargesService, ChargeDictionary} from '../charges.service';

@Component({
  moduleId: module.id,
  selector: 'shieldpicker',
  templateUrl: 'shieldpicker.component.html',
  styleUrls: ['shieldpicker.component.css'],
  providers: [ChargesService],
})
export class ShieldpickerComponent implements OnInit {
  charges: ChargeDictionary;
  constructor(private chargeSvc: ChargesService) {}

  @Input('game') 
  public game: GameConfig;

  @Input('index')
  public currentIndex: number = -1; 

  ngOnInit() {
    this.charges = this.chargeSvc.charges;
  }

  select(index: number) {
    this.currentIndex = index;
  }

}
