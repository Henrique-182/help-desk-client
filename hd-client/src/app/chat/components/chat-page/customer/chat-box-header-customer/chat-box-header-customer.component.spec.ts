import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxHeaderCustomerComponent } from './chat-box-header-customer.component';

describe('ChatBoxHeaderCustomerComponent', () => {
  let component: ChatBoxHeaderCustomerComponent;
  let fixture: ComponentFixture<ChatBoxHeaderCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatBoxHeaderCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBoxHeaderCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
