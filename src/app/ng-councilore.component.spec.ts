import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NgCounciloreAppComponent } from '../app/ng-councilore.component';

beforeEachProviders(() => [NgCounciloreAppComponent]);

describe('App: NgCouncilore', () => {
  it('should create the app',
      inject([NgCounciloreAppComponent], (app: NgCounciloreAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng-councilore works!\'',
      inject([NgCounciloreAppComponent], (app: NgCounciloreAppComponent) => {
    expect(app.title).toEqual('ng-councilore works!');
  }));
});
