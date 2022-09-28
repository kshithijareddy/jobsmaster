import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulltimeComponent } from './fulltime.component';

describe('FulltimeComponent', () => {
  let component: FulltimeComponent;
  let fixture: ComponentFixture<FulltimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulltimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FulltimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
