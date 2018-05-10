import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupQuestionListComponent } from './group-question-list.component';

describe('GroupQuestionListComponent', () => {
  let component: GroupQuestionListComponent;
  let fixture: ComponentFixture<GroupQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
