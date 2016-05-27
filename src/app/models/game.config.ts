import {City} from './city';
import {DecisionHistory} from './decision';

export class GameConfig{
    city: City;
    useBuildings: boolean = true;
    useCronies: boolean = false;
    influenceToWin: number = 15;
    history: DecisionHistory[];
    
    static CreateNew(): GameConfig{
        var result = new GameConfig();
        result.city = new City();
        result.history = [];
        return result;
    } 
}

