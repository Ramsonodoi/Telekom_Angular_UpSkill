import { TestBed } from '@angular/core/testing';

import { InlineNotificationService } from './inline-notification.service';

describe('InlineNotificationService', () => {
  let service: InlineNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InlineNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
