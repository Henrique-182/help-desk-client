import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsPageComponent } from './sectors-page.component';

describe('SectionsPageComponent', () => {
  let component: SectorsPageComponent;
  let fixture: ComponentFixture<SectorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectorsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
