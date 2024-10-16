import { TestBed } from '@angular/core/testing';

import { NgSecureAccessService } from './ng-secure-access.service';

describe('NgSecureAccessService', () => {
  let service: NgSecureAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgSecureAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
