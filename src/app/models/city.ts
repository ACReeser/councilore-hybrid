import {DecisionResolution} from './decision';
import {Building} from './building';
import {Utils} from '../utils';

export class City {
    name: string;
    day: number;
    quadrants: string[] = [];
    buildings: Building[] = [];
    stats: Stats;
    treasury: number = 0;
    
    static goldPerTradeTier = 5;
     
    constructor() {
        this.stats = new Stats();
    }
    
    applyResolution(res: DecisionResolution): void{
        this.treasury += res.treasuryDelta || 0;
        this.stats.law.changeValue( res.lawDelta || 0);
        this.stats.farming.changeValue(res.farmingDelta || 0);
        this.stats.trade.changeValue(res.tradeDelta || 0);
        this.stats.lore.changeValue(res.loreDelta || 0);
        this.stats.society.changeValue(res.societyDelta || 0);
    }
    
    collectTaxes(): number{
        var collected = Math.floor( Math.random() * this.stats.trade.getTier() * City.goldPerTradeTier );
        var lostToCrime = this.stats.law.getTier();
        
        if (lostToCrime < 0)
            collected -= lostToCrime;
            
        this.treasury += collected;
        
        return collected;        
    }

    afterDeserialize(): void{
        this.stats = Utils._Extend(Stats, this.stats);
        this.stats.afterDeserialize();
    }
    
    getUpgradeableBuildingFromStat(statName: string): Building {
        for (var index = 0; index < this.buildings.length; index++) {
            var building = this.buildings[index];
            if (building.stat == statName && building.upgradeTo)
                return building;
        }
        return null;
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

    afterDeserialize(): void{
        this.law = Utils._Extend(StatRange, this.law);
        this.trade = Utils._Extend(StatRange, this.trade);
        this.farming = Utils._Extend(StatRange, this.farming);
        this.society = Utils._Extend(StatRange, this.society);
        this.lore = Utils._Extend(StatRange, this.lore);
    }
}

export class StatRange{
    name: string;
    maximum: number;
    minimum: number;
    value: number;
    numberOfTiers: number;
    
    constructor(name: string, max: number = 20, min: number = 0, v: number = 5, numTiers: number = 4) {
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
        if (this.minimum < 0)
        {
            var result: any = {
                height: Math.abs(this.value / (this.maximum - this.minimum)  * 100) + '%'
            }
            if (this.value < 0) {
                result.top = '50%';
                result.background = '#FF4136';
            } else {
                result.bottom = '50%';
            }
            return result;
        }
        else
        {
            return {
                height: (this.value / this.maximum * 100) + '%'
            }
        }
    }

    changeValue(delta: number){
        this.value += delta;
        this.value = Math.min(this.maximum, this.value);
        this.value = Math.max(this.minimum, this.value);
    }
}