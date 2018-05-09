import { TestBed, inject } from '@angular/core/testing';

import { QuestionfilterService } from './questionfilter.service';

describe('QuestionfilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionfilterService]
    });
  });

  it('should be created', inject([QuestionfilterService], (service: QuestionfilterService) => {
    expect(service).toBeTruthy();
  }));
});
