import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgesPageComponent } from './knowledges-page.component';

describe('KnowledgesPageComponent', () => {
  let component: KnowledgesPageComponent;
  let fixture: ComponentFixture<KnowledgesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KnowledgesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KnowledgesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
