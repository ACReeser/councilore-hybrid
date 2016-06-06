import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'how-to-play',
  templateUrl: 'howtoplay.component.html',
  styleUrls: ['howtoplay.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HowToPlayComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
