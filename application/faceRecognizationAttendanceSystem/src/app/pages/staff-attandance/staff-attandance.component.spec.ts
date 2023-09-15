import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttandanceComponent } from './staff-attandance.component';

describe('StaffAttandanceComponent', () => {
  let component: StaffAttandanceComponent;
  let fixture: ComponentFixture<StaffAttandanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAttandanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAttandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
