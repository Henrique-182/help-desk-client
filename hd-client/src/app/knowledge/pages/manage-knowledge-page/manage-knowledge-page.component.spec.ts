import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKnowledgePageComponent } from './manage-knowledge-page.component';

describe('ManageKnowledgePageComponent', () => {
  let component: ManageKnowledgePageComponent;
  let fixture: ComponentFixture<ManageKnowledgePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageKnowledgePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageKnowledgePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
