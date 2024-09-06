import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectorDialogComponent } from './add-sector-dialog.component';

describe('AddSectorDialogComponent', () => {
  let component: AddSectorDialogComponent;
  let fixture: ComponentFixture<AddSectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSectorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
