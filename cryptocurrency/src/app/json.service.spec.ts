import { TestBed } from '@angular/core/testing';

import { LongestBearishService } from './longest-bearish.service';

describe('LongestBearishService', () => {
  let service: LongestBearishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongestBearishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
