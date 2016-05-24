import { Component, OnInit } from '@angular/core';

export class Game {
    day: number;
}

@Component({
  moduleId: module.id,
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
  constructor() {
      this.game = new Game();
      this.game.day = 1;
  }

  ngOnInit() {
  }

}
