import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatHomePageComponent } from './pages/chat-home-page/chat-home-page.component';
import { SectorsPageComponent } from './pages/sectors-page/sectors-page.component';
import { SharedModule } from '../shared/shared.module';
import { ManageSectorPageComponent } from './pages/manage-sector-page/manage-sector-page.component';
import { SelectSectorPageComponent } from './pages/select-sector-page/select-sector-page.component';
import { ChatTalkPageComponent } from './pages/chat-talk-page/chat-talk-page.component';


@NgModule({
  declarations: [
    ChatHomePageComponent,
    SectorsPageComponent,
    ManageSectorPageComponent,
    SelectSectorPageComponent,
    ChatTalkPageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }
