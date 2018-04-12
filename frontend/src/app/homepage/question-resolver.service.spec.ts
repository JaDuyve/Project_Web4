import { TestBed, inject } from '@angular/core/testing';

import { QuestionResolverService } from './question-resolver.service';

describe('QuestionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionResolverService]
    });
  });

  it('should be created', inject([QuestionResolverService], (service: QuestionResolverService) => {
    expect(service).toBeTruthy();
  }));
});
