import { Injectable } from '@angular/core';
import {GameConfig} from './models/game.config';
import {StorageService} from './storage.service';

@Injectable()
export class GameService {
  public currentGame: GameConfig;
  constructor(private svc: StorageService) {}
  save(){
      this.svc.save(this.currentGame);
  }
  loadLast(){
      this.currentGame = this.svc.loadLast();
  }
  public hasSavedGame(): boolean{
      return this.svc.hasSavedGame();
  }
}
