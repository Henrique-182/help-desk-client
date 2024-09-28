import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRoomDialogComponent } from './close-room-dialog.component';

describe('CloseRoomDialogComponent', () => {
  let component: CloseRoomDialogComponent;
  let fixture: ComponentFixture<CloseRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloseRoomDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
