/// <reference path="../lib/storejs.d.ts" />
import { Injectable } from '@angular/core';
import {GameConfig} from './models/game.config';


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
      
      return <GameConfig>store.get(gameName);      
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
