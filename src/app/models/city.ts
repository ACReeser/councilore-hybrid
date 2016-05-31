import {DecisionResolution} from './decision';

export class City {
    name: string;
    day: number;
    quadrants: string[] = [];
    stats: Stats;
    treasury: number = 0;
    
    static goldPerTradeTier = 5;
     
    constructor() {
        this.stats = new Stats();
    }
    
    applyResolution(res: DecisionResolution): void{
        this.treasury += res.treasuryDelta || 0;
        this.stats.law.value += res.lawDelta || 0;
        this.stats.farming.value += res.farmingDelta || 0;
        this.stats.trade.value += res.tradeDelta || 0;
        this.stats.lore.value += res.loreDelta || 0;
        this.stats.society.value += res.societyDelta || 0;
    }
    
    collectTaxes(): number{
        var collected = Math.floor( Math.random() * this.stats.trade.getTier() * City.goldPerTradeTier );
        var lostToCrime = this.stats.law.getTier();
        
        if (lostToCrime < 0)
            collected -= lostToCrime;
            
        this.treasury += collected;
        
        return collected;        
    }
}

export class Stats{
    law: StatRange;
    trade: StatRange;
    farming: StatRange;
    society: StatRange;
    lore: StatRange;
    
    constructor() {
        this.law = new StatRange("Law", 9, -9, 0, 6);    
        this.trade = new StatRange("Trade");
        this.farming = new StatRange("Farming");
        this.society = new StatRange("Society");
        this.lore = new StatRange("Lore");
    }
}

export class StatRange{
    name: string;
    maximum: number;
    minimum: number;
    value: number;
    numberOfTiers: number;
    
    constructor(name: string, max: number = 20, min: number = 1, v: number = 5, numTiers: number = 4) {
        this.name = name;
        this.maximum = max;
        this.minimum = min;
        this.value = v;
        this.numberOfTiers = numTiers;
    }
    
    //returns "tier" that current value falls within
    //e.g. value of 6 with max of 20, numtiers of 4, returns 2 
    //used when calculating taxes and corruption
    getTier(): number{
        return Math.ceil(this.value / (this.maximum - this.minimum + 1)  / this.numberOfTiers);
    }
    
    getStyle(){
        return {
            height: (this.value / this.maximum * 100) + '%'
        }
    }
}