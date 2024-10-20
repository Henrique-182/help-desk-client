import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomDialogCustomerComponent } from './add-room-dialog-customer.component';

describe('AddRoomDialogCustomerComponent', () => {
  let component: AddRoomDialogCustomerComponent;
  let fixture: ComponentFixture<AddRoomDialogCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoomDialogCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRoomDialogCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
