import { TestBed } from '@angular/core/testing';

import { FileDocumentService } from './file-document.service';

describe('FileDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileDocumentService = TestBed.get(FileDocumentService);
    expect(service).toBeTruthy();
  });
});
