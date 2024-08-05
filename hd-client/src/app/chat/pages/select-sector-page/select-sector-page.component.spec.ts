import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSectorPageComponent } from './select-sector-page.component';

describe('SelectSectorPageComponent', () => {
  let component: SelectSectorPageComponent;
  let fixture: ComponentFixture<SelectSectorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSectorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSectorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
