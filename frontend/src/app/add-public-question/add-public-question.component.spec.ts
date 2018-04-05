import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPublicQuestionComponent } from './add-public-question.component';

describe('AddPublicQuestionComponent', () => {
  let component: AddPublicQuestionComponent;
  let fixture: ComponentFixture<AddPublicQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPublicQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPublicQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
