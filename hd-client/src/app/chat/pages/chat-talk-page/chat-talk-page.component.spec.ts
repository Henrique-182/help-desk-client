import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTalkPageComponent } from './chat-talk-page.component';

describe('ChatTalkPageComponent', () => {
  let component: ChatTalkPageComponent;
  let fixture: ComponentFixture<ChatTalkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatTalkPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatTalkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
