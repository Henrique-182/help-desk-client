import { TestBed } from '@angular/core/testing';

import { ChatDashboardService } from './chat-dashboard.service';

describe('ChatDashboardService', () => {
  let service: ChatDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
