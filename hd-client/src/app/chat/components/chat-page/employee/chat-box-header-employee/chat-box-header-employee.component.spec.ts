import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxHeaderEmployeeComponent } from './chat-box-header-employee.component';

describe('ChatBoxHeaderEmployeeComponent', () => {
  let component: ChatBoxHeaderEmployeeComponent;
  let fixture: ComponentFixture<ChatBoxHeaderEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatBoxHeaderEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBoxHeaderEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
