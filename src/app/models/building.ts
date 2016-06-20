import {Utils} from '../utils';
export class Building {
    name: string;
    canBeUpgraded: boolean;
    treasuryCost: number;
    imageSrc: string;
    statIconSrc: string;
    farmingDelta: number;
    tradeDelta: number;
    loreDelta: number;
    societyDelta: number;
    lawDelta: number;
    
    constructor (aName: string, canUpgrade: boolean, image:string, statIcon:string, farmingD: number = 0, tradeD: number = 0, loreD: number = 0, societyD: number = 0, lawD: number = 0, cost:number = 5) {
        this.name = aName;
        this.canBeUpgraded = canUpgrade;
        this.treasuryCost = cost;
        this.imageSrc = image;
        this.statIconSrc = statIcon;
        this.farmingDelta = farmingD;
        this.tradeDelta = tradeD;
        this.loreDelta = loreD;
        this.societyDelta = societyD;
        this.lawDelta = lawD;
    }
    static construct(prototype: Building): Building{
        return Utils._ExtendObject(prototype, {});    
    }
    
    static Farm: Building = new Building("Farm", true, 'chapel', 'social', 2);
    static Plantation: Building = new Building("Plantation", false, 'plantation', 'food', 3);
    
    static Chapel: Building = new Building("Chapel", true, 'chapel', 'social', 0, 0, 0, 2);
    static Monastery: Building = new Building("Monastery", false, 'monastery', 'social', 0, 0, 0, 3);
}
