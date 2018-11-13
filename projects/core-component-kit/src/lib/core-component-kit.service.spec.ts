import { TestBed, inject } from '@angular/core/testing';

import { CoreComponentKitService } from './core-component-kit.service';

describe('CoreComponentKitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreComponentKitService]
    });
  });

  it('should be created', inject([CoreComponentKitService], (service: CoreComponentKitService) => {
    expect(service).toBeTruthy();
  }));
});
