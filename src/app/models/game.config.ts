import {City} from './city';
import {DecisionHistory} from './decision';
import {Utils} from '../utils';

export class GameConfig{
    city: City;
    useBuildings: boolean = true;
    useCronies: boolean = false;
    influenceToWin: number = 15;
    history: DecisionHistory[];
    isNew: boolean = false;

    static CreateNew(): GameConfig{
        var result = new GameConfig();
        result.city = new City();
        result.history = [];
        return result;
    }
    
    afterDeserialize(): void{
        for (var index = 0; index < this.history.length; index++) {
            var element = this.history[index];

            this.history[index] = Utils._Extend(DecisionHistory, element);
        }

        this.city = Utils._Extend(City, this.city);
        this.city.afterDeserialize();
    }
}

