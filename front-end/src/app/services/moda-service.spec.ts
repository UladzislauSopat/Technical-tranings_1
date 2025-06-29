import { TestBed } from '@angular/core/testing';

import { ModaService } from './moda-service';

describe('ModaService', () => {
  let service: ModaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
