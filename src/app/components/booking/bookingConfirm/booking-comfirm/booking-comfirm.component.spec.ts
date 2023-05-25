import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingComfirmComponent } from './booking-comfirm.component';

describe('BookingComfirmComponent', () => {
  let component: BookingComfirmComponent;
  let fixture: ComponentFixture<BookingComfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingComfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
