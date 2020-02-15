import { TestBed } from '@angular/core/testing';

import { StudentLinkService } from './student-link.service';

describe('StudentLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentLinkService = TestBed.get(StudentLinkService);
    expect(service).toBeTruthy();
  });
});
