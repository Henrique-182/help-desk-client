import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageScrollPanelComponent } from './message-scroll-panel.component';

describe('MessageScrollPanelComponent', () => {
  let component: MessageScrollPanelComponent;
  let fixture: ComponentFixture<MessageScrollPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageScrollPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageScrollPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
