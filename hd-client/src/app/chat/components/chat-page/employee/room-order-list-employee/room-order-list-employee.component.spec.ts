import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOrderListEmployeeComponent } from './room-order-list-employee.component';

describe('RoomOrderListEmployeeComponent', () => {
  let component: RoomOrderListEmployeeComponent;
  let fixture: ComponentFixture<RoomOrderListEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomOrderListEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomOrderListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
