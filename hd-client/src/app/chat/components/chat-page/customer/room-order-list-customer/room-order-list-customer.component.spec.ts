import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOrderListCustomerComponent } from './room-order-list-customer.component';

describe('RoomOrderListCustomerComponent', () => {
  let component: RoomOrderListCustomerComponent;
  let fixture: ComponentFixture<RoomOrderListCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomOrderListCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomOrderListCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
