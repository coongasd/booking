import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComfirmComponent } from './add-comfirm.component';

describe('AddComfirmComponent', () => {
  let component: AddComfirmComponent;
  let fixture: ComponentFixture<AddComfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
