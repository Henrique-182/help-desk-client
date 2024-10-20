import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoxFooterCustomerComponent } from './chat-box-footer-customer.component';

describe('ChatBoxFooterCustomerComponent', () => {
  let component: ChatBoxFooterCustomerComponent;
  let fixture: ComponentFixture<ChatBoxFooterCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatBoxFooterCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBoxFooterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
