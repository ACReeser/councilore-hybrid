import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import {DailyDecision} from './models/decision';

@Injectable()
export class DecisionService {
  private realDataURL: string = "/app/data/decision.data.json";
  private sampleDataURL: string = "/app/data/sample.data.json";
  constructor(private http: Http) {}

  getAllDecisions(url: string = this.realDataURL): Observable<any> {
      return this.http.get(url)
      .map(this.extractArray);
  }
  
  getNextDailyDecision(url: string = this.realDataURL): DailyDecision{
      var decisions: DailyDecision[] = [];
      this.getAllDecisions().subscribe(
          (decs) => {
              decisions = decs[0];
          },
          (error) => {
              return this.getNextDailyDecision(this.sampleDataURL);
          }
      );
      return decisions[0];
  }
  
  private extractArray(res: Response) {
    let array = res.json();
    return array || [];
  }
  
}
