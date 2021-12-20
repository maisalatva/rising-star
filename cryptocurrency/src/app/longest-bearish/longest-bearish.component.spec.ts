import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongestBearishComponent } from './longest-bearish.component';

describe('LongestBearishComponent', () => {
  let component: LongestBearishComponent;
  let fixture: ComponentFixture<LongestBearishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongestBearishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongestBearishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
