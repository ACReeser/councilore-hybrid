import { Injectable } from '@angular/core';
import {GameConfig} from './models/game.config';

@Injectable()
export class GameService {
  public currentGame: GameConfig;
  constructor() {}

}
