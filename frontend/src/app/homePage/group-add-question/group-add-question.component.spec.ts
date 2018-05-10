import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddQuestionComponent } from './group-add-question.component';

describe('GroupAddQuestionComponent', () => {
  let component: GroupAddQuestionComponent;
  let fixture: ComponentFixture<GroupAddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAddQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
