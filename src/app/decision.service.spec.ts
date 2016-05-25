import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { DecisionService } from './decision.service';

describe('Decision Service', () => {
  beforeEachProviders(() => [DecisionService]);

  it('should ...',
      inject([DecisionService], (service: DecisionService) => {
    expect(service).toBeTruthy();
  }));
});
