import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuwsfeedComponent } from './nieuwsfeed.component';

describe('NieuwsfeedComponent', () => {
  let component: NieuwsfeedComponent;
  let fixture: ComponentFixture<NieuwsfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NieuwsfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuwsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
