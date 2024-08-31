import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOrderListComponent } from './room-order-list.component';

describe('RoomOrderListComponent', () => {
  let component: RoomOrderListComponent;
  let fixture: ComponentFixture<RoomOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
