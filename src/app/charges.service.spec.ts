import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ChargesService } from './charges.service';

describe('Charges Service', () => {
  beforeEachProviders(() => [ChargesService]);

  it('should ...',
      inject([ChargesService], (service: ChargesService) => {
    expect(service).toBeTruthy();
  }));
});
