import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomDialogEmployeeComponent } from './add-room-dialog-employee.component';

describe('AddRoomDialogComponent', () => {
  let component: AddRoomDialogEmployeeComponent;
  let fixture: ComponentFixture<AddRoomDialogEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoomDialogEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRoomDialogEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
