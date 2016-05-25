import {City} from './city';
import {DecisionResolution} from './decision';

export class GameConfig{
    city: City;
    useBuildings: boolean = true;
    useCronies: boolean = false;
    influenceToWin: number = 15;
    resolutions: DecisionResolution[];
    
    static CreateNew(): GameConfig{
        var result = new GameConfig();
        result.city = new City();
        return result;
    } 
}

