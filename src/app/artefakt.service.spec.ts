import { TestBed } from '@angular/core/testing';

import { ArtefaktService } from './artefakt.service';

describe('ArtefaktService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtefaktService = TestBed.get(ArtefaktService);
    expect(service).toBeTruthy();
  });
});
