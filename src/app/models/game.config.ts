import {City} from './city';

export class GameConfig{
    city: City;
    useBuildings: boolean = true;
    useCronies: boolean = false;
    influenceToWin: number = 15;
    
    static CreateNew(): GameConfig{
        var result = new GameConfig();
        result.city = new City();
        return result;
    } 
}

