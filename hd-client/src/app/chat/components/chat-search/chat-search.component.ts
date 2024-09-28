import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-search',
  templateUrl: './chat-search.component.html',
  styleUrl: './chat-search.component.scss'
})
export class ChatSearchComponent {

  click() {
    console.log(`clicou`);
  }

}
