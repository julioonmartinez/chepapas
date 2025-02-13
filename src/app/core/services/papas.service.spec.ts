import { TestBed } from '@angular/core/testing';

import { PapasService } from './papas.service';

describe('PapasService', () => {
  let service: PapasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PapasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
