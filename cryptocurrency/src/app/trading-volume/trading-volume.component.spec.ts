import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingVolumeComponent } from './trading-volume.component';

describe('TradingVolumeComponent', () => {
  let component: TradingVolumeComponent;
  let fixture: ComponentFixture<TradingVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingVolumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
