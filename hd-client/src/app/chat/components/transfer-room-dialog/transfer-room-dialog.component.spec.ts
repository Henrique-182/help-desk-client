import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRoomDialogComponent } from './transfer-room-dialog.component';

describe('TransferRoomDialogComponent', () => {
  let component: TransferRoomDialogComponent;
  let fixture: ComponentFixture<TransferRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferRoomDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
