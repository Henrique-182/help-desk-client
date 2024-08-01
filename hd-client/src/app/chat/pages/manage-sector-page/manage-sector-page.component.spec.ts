import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSectorPageComponent } from './manage-sector-page.component';

describe('ManageSectorPageComponent', () => {
  let component: ManageSectorPageComponent;
  let fixture: ComponentFixture<ManageSectorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageSectorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageSectorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
