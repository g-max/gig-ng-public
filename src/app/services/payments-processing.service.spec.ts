import { TestBed } from '@angular/core/testing';

import { PaymentsProcessingService } from './payments-processing.service';

describe('PaymentsProcessingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentsProcessingService = TestBed.get(PaymentsProcessingService);
    expect(service).toBeTruthy();
  });
});
