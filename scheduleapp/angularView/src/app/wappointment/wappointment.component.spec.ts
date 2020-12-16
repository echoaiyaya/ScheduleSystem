import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WappointmentComponent } from './wappointment.component';

describe('WappointmentComponent', () => {
  let component: WappointmentComponent;
  let fixture: ComponentFixture<WappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WappointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
