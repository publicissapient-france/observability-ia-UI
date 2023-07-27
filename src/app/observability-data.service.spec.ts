import { TestBed } from '@angular/core/testing';

import { ObservabilityDataService } from './observability-data.service';

describe('ObservabilityDataService', () => {
  let service: ObservabilityDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservabilityDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
