import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxFooterEmployeeComponent } from './chat-box-footer-employee.component';

describe('ChatBoxFooterEmployeeComponent', () => {
  let component: ChatBoxFooterEmployeeComponent;
  let fixture: ComponentFixture<ChatBoxFooterEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatBoxFooterEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBoxFooterEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
