import { TestBed } from '@angular/core/testing';

import { NeohandlerService } from './neohandler.service';

describe('NeohandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeohandlerService = TestBed.get(NeohandlerService);
    expect(service).toBeTruthy();
  });
});
