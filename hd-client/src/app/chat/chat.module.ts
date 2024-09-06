import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatHomePageComponent } from './pages/chat-home-page/chat-home-page.component';
import { SectorsPageComponent } from './pages/sectors-page/sectors-page.component';
import { SharedModule } from '../shared/shared.module';
import { ManageSectorPageComponent } from './pages/manage-sector-page/manage-sector-page.component';
import { SelectSectorPageComponent } from './pages/select-sector-page/select-sector-page.component';
import { ChatTalkPageComponent } from './pages/chat-talk-page/chat-talk-page.component';
import { RoomOrderListComponent } from './components/room-order-list/room-order-list.component';
import { MessageRoomOrderListPipe } from './pipes/message-room-order-list.pipe';
import { TimeRoomOrderListPipe } from './pipes/time-room-order-list.pipe';
import { MessageScrollPanelComponent } from './components/message-scroll-panel/message-scroll-panel.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatSearchComponent } from './components/chat-search/chat-search.component';
import { AddSectorDialogComponent } from './components/add-sector-dialog/add-sector-dialog.component';


@NgModule({
  declarations: [
    ChatHomePageComponent,
    SectorsPageComponent,
    ManageSectorPageComponent,
    SelectSectorPageComponent,
    ChatTalkPageComponent,
    RoomOrderListComponent,
    MessageRoomOrderListPipe,
    TimeRoomOrderListPipe,
    MessageScrollPanelComponent,
    ChatBoxComponent,
    ChatSearchComponent,
    AddSectorDialogComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }
