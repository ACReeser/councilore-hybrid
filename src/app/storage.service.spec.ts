import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('Storage Service', () => {
  beforeEachProviders(() => [StorageService]);

  it('should ...',
      inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
});
