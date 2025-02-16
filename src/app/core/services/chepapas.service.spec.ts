import { TestBed } from '@angular/core/testing';

import { ChepapasService } from './chepapas.service';

describe('ChepapasService', () => {
  let service: ChepapasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChepapasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
