/// <reference path="../lib/storejs.d.ts" />
import { Injectable } from '@angular/core';
import {GameConfig} from './models/game.config';
import {Utils} from './utils';

@Injectable()
export class StorageService {

  constructor() {}

  save(game: GameConfig) {
      store.set(game.city.name, game);
      store.set("lastSavedGame", game.city.name);
  }
  loadLast(): GameConfig{
      var gameName = store.get("lastSavedGame");
      if (gameName == null || gameName == "")
      {
          return null;
      }
      
      var last = Utils._Extend(GameConfig, store.get(gameName));
      last.afterDeserialize();
      return last;
  }
  hasSavedGame(): boolean{
      var gameName = store.get("lastSavedGame");
      if (gameName == null || gameName == "")
      {
          return false;
      }
      
      return true;
  }
  
}
