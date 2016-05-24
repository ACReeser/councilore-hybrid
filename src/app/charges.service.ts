import { Injectable } from '@angular/core';

const blue: string = "#8cc6ec";
const orange: string = "#f7941e";

export class ChargeMetadata {
    public color:string;
    constructor(public category: string, public element: string) {
        if (element == "ice")
            this.color = "black";
        else if (element == "heart" || element == "water")
            this.color = blue;
        else if (element == "fire" || element == "earth")
            this.color = orange;
        else
            this.color = "white";
    }    
}

export interface ChargeDictionary { 
    [name: string]: ChargeMetadata;
}

@Injectable()
export class ChargesService {
  public blue: string = blue;
  public orange: string = orange;
  public charges: ChargeDictionary = {
    'air':    new ChargeMetadata('element', 'air'),
    'anchor': new ChargeMetadata('symbol', 'water'),
    'axe':    new ChargeMetadata('weapon', 'plant'),
    'bow':    new ChargeMetadata('weapon', 'air'),
    'clover': new ChargeMetadata('element', 'plant'),
    'cross':  new ChargeMetadata('symbol', 'earth'),
    'crow':   new ChargeMetadata('animal', 'death'),
    'death':  new ChargeMetadata('element', 'death'),
    'dragon': new ChargeMetadata('animal', 'plant'),
    'eagle':  new ChargeMetadata('animal', 'air'),
    'earth':  new ChargeMetadata('element', 'earth'),
    'eye':    new ChargeMetadata('symbol', 'heart'),
    'fire':   new ChargeMetadata('element', 'fire'),
    'fleur':  new ChargeMetadata('symbol', 'plant'),
    'hammer': new ChargeMetadata('weapon', 'earth'),
    'heart':  new ChargeMetadata('element', 'heart'),
    'ice':    new ChargeMetadata('element', 'ice'),
    'lion':   new ChargeMetadata('animal', 'fire'),
    'monkey': new ChargeMetadata('animal', 'earth'),
    'moon':   new ChargeMetadata('symbol', 'ice'),
    'ninja':  new ChargeMetadata('weapon', 'death'),
    'octopus':new ChargeMetadata('animal', 'water'),
    'scythe': new ChargeMetadata('symbol', 'death'),
    'star':   new ChargeMetadata('symbol', 'air'),
    'sun':    new ChargeMetadata('symbol', 'fire'),
    'sword':  new ChargeMetadata('weapon', 'ice'),
    'trident':new ChargeMetadata('weapon', 'water'),
    'unicorn':new ChargeMetadata('animal', 'heart'),
    'wand':   new ChargeMetadata('weapon', 'heart'),
    'water':  new ChargeMetadata('element', 'water'),
    'wolf':   new ChargeMetadata('animal', 'ice'),
    'xbow':   new ChargeMetadata('weapon', 'fire')
  };
  
  public categories: string[] = [
      "element",
      "animal",
      "weapon",
      "symbol"
  ];
  
  public elements: string[] = [
      "plant",
      "fire",
      "air",
      "heart",
      "earth",
      "water",
      "ice",
      "death"
  ];

  constructor() {}

}
