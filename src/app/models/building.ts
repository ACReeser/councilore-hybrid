import {Utils} from '../utils';
export class Building {
    name: string;
    canBeUpgraded: boolean;
    treasuryCost: number;
    imageSrc: string;
    stat: string;
    statIconSrc: string;
    farmingDelta: number;
    tradeDelta: number;
    loreDelta: number;
    societyDelta: number;
    lawDelta: number;
    
    constructor (aStat: string, aName: string, canUpgrade: boolean, image:string, statIcon:string, farmingD: number = 0, tradeD: number = 0, loreD: number = 0, societyD: number = 0, lawD: number = 0, cost:number = 5) {
        this.stat = aStat;
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
    
    //todo: make UpgradeTo instead of canUpgrade, doing leaves first, then dependencies
    //static Plantation: Building = new Building('farming', "Plantation", null, 'plantation', 'food', 3);
    //static Farm: Building = new Building('farming', "Farm", Building.Plantation, 'farm', 'social', 2);
    static Farm: Building = new Building('farming', "Farm", true, 'farm', 'social', 2);
    static Plantation: Building = new Building('farming', "Plantation", false, 'plantation', 'food', 3);
    
    static Market: Building = new Building('trade', "Market", true, 'market', 'business', 0, 2);
    static Plaza: Building = new Building('trade', "Plaza", false, 'plaza', 'business', 0, 3);
    
    static Library: Building = new Building('lore', "Library", true, 'library', 'feather-and-ink-bottle', 0, 0, 2);
    static College: Building = new Building('lore', "College", false, 'college', 'feather-and-ink-bottle', 0, 0, 3);
    
    static Chapel: Building = new Building('society', "Chapel", true, 'chapel', 'social', 0, 0, 0, 2);
    static Monastery: Building = new Building('society', "Monastery", false, 'monastery', 'social', 0, 0, 0, 3);  
    
    static Barracks: Building = new Building('law', "Barracks", true, 'barracks', 'shapes', 0, 0, 0, 0, 2);
    static Keep: Building = new Building('law', "Keep", false, 'keep', 'shapes', 0, 0, 0, 0, 3);
    
    static nameToBuilding(name: string): Building{
        switch(name){
            case 'Farm':
            return Building.Farm;
            case 'Plantation':
            return Building.Plantation;
            case 'Market':
            return Building.Market;
            case 'Plaza':
            return Building.Plaza;
            case 'Library':
            return Building.Library;
            case 'College':
            return Building.College;
            case 'Chapel':
            return Building.Chapel;
            case 'Monastery':
            return Building.Monastery;
            case 'Barracks':
            return Building.Barracks;
            case 'Keep':
            return Building.Keep;
        }
        return null;
    }
    
    static statToBuilding(stat: string): Building{
        switch(stat){
            case 'farming':
            return Building.Farm;
            case 'trade':
            return Building.Market;
            case 'lore':
            return Building.Library;
            case 'social':
            return Building.Chapel;
            case 'law':
            return Building.Barracks;
        }
        return null;
    }
}
