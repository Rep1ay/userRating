import { TestBed } from '@angular/core/testing';

import { WatchersService } from './watchers.service';

describe('WatchersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WatchersService = TestBed.get(WatchersService);
    expect(service).toBeTruthy();
  });
});
