export class City {
    name: string;
    day: number;
    quadrants: string[] = [];
    stats: Stats;
    treasury: number = 0;
    
    constructor() {
        this.stats = new Stats();
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
}