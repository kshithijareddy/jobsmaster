import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyplannerComponent } from './dailyplanner.component';

describe('DailyplannerComponent', () => {
  let component: DailyplannerComponent;
  let fixture: ComponentFixture<DailyplannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyplannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyplannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
