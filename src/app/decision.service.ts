import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import {DailyDecision} from './models/decision';

@Injectable()
export class DecisionService {
  private realDataURL: string = "/app/data/decision.data.json";
  private sampleDataURL: string = "/app/data/sample.data.json";
  public AllDecisions: DailyDecision[];
  
  public DailyDecision: Observable<DailyDecision>;
  private _daily: Observer<DailyDecision>;
  
  constructor(private http: Http) {
    this.DailyDecision = new Observable(observer => {
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
  
  private nextDay: DailyDecision;
  private getNextDecision(){
      
  }
  
  askForNextDailyDecision(){
      this._daily.next(this.nextDay);
  }
  
  private extractArray(res: Response) {
    let array = res.json();
    return array || [];
  }
  
}
