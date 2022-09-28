import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptrackerComponent } from './apptracker.component';

describe('ApptrackerComponent', () => {
  let component: ApptrackerComponent;
  let fixture: ComponentFixture<ApptrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApptrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
