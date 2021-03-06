import {Utils} from '../utils';
export class Building {
    name: string;
    upgradeTo: Building;
    treasuryCost: number;
    imageSrc: string;
    stat: string;
    statIconSrc: string;
    farmingDelta: number;
    tradeDelta: number;
    loreDelta: number;
    societyDelta: number;
    lawDelta: number;
    
    constructor (aStat: string, aName: string, upgrade: Building, image:string, statIcon:string, farmingD: number = 0, tradeD: number = 0, loreD: number = 0, societyD: number = 0, lawD: number = 0, cost:number = 5) {
        this.stat = aStat;
        this.name = aName;
        this.upgradeTo = upgrade;
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
    static Plantation: Building = new Building('farming', "Plantation", null, 'plantation', 'food', 3);
    static Farm: Building = new Building('farming', "Farm", Building.Plantation, 'farm', 'food', 2);
    
    static Plaza: Building = new Building('trade', "Plaza", null, 'plaza', 'business', 0, 3);
    static Market: Building = new Building('trade', "Market", Building.Plaza, 'market', 'business', 0, 2);
    
    static College: Building = new Building('lore', "College", null, 'college', 'feather-and-ink-bottle', 0, 0, 3);
    static Library: Building = new Building('lore', "Library", Building.College, 'library', 'feather-and-ink-bottle', 0, 0, 2);
    
    static Monastery: Building = new Building('society', "Monastery", null, 'monastery', 'social', 0, 0, 0, 3);  
    static Chapel: Building = new Building('society', "Chapel", Building.Monastery, 'chapel', 'social', 0, 0, 0, 2);
    
    static Keep: Building = new Building('law', "Keep", null, 'keep', 'shapes', 0, 0, 0, 0, 3);
    static Barracks: Building = new Building('law', "Barracks", Building.Keep, 'barracks', 'shapes', 0, 0, 0, 0, 2);
    
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
            case 'society':
            return Building.Chapel;
            case 'law':
            return Building.Barracks;
        }
        return null;
    }
}
