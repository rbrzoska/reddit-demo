import { TestBed, inject } from '@angular/core/testing';

import { MockBackendInterceptorService } from './mock-backend-interceptor.service';

describe('MockBackendInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockBackendInterceptorService]
    });
  });

  it('should be created', inject([MockBackendInterceptorService], (service: MockBackendInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
