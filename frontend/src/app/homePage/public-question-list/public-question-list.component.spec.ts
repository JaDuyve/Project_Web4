import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicQuestionListComponent } from './public-question-list.component';

describe('PublicQuestionListComponent', () => {
  let component: PublicQuestionListComponent;
  let fixture: ComponentFixture<PublicQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
