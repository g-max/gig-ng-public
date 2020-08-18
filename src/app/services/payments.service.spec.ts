import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PaymentsHttpService } from './payments.service';

describe('PaymentsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PaymentsHttpService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PaymentsHttpService = TestBed.get(PaymentsHttpService);
    expect(service).toBeTruthy();
  });
});
