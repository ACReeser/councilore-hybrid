import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import {DailyDecision, DecisionResolution} from './models/decision';
import {GameConfig} from './models/game.config';
import {GameService} from './game.service';

@Injectable()
export class DecisionService {
  private realDataURL: string = "/app/data/decision.data.json";
  private sampleDataURL: string = "/app/data/sample.data.json";
  public AllDecisions: DailyDecision[];
  
  private currentDailyFeed: Observable<DailyDecision>;
  private _dailyFeed: Observer<DailyDecision>;
  
  constructor(private http: Http, private gameSvc: GameService) {
  }  
  
  public getDailyFeed(): Observable<DailyDecision> {
    this.currentDailyFeed = new Observable(observer => {
        this._dailyFeed = observer;
        this.pullAllDecisions();
    });
    
    return this.currentDailyFeed;
  }
  
  private pullAllDecisions(){
    this.getAllDecisions().subscribe(
        (decs) => this.feedAllDecisions(decs),
        (error) => {
            this.getAllDecisions(this.sampleDataURL).subscribe(
                (decs) => this.feedAllDecisions(decs)
            )
        }        
    );       
  }
  private feedAllDecisions(decs: any){
    this.AllDecisions = decs;
    this.getNextDecision();
    this.askForNextDailyDecision();      
  }

  getAllDecisions(url: string = this.realDataURL): Observable<any> {
      return this.http.get(url)
      .map(this.extractArray);
  }
  
  private currentDay: DailyDecision;
  private getNextDecision(): DailyDecision{
      var result: DailyDecision;
      var candidates: DailyDecision[] =
        this.AllDecisions.filter((dec) => {
            if (dec.requirements == null)
                return true;
            else
            {
                //todo: requirement logic 
            }
            
            return false;
        }) || [];
      
      result = candidates[Math.floor(Math.random()* candidates.length)];
      
      return result;
  }
  
  askForNextDailyDecision(){
      this.currentDay = this.getNextDecision();
      this._dailyFeed.next(this.currentDay);
  }
  
  private extractArray(res: Response) {
    let array = res.json();
    return array || [];
  }
  
}