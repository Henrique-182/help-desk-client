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
import { UploadFileDialogComponent } from './components/upload-file-dialog/upload-file-dialog.component';
import { HeaderDialogUploadFilePipe } from './pipes/header-dialog-upload-file.pipe';
import { EditRoomDialogComponent } from './components/edit-room-dialog/edit-room-dialog.component';
import { EditRoomDialogRoomStatusPipe } from './pipes/edit-room-dialog-room-status.pipe';
import { CloseRoomDialogComponent } from './components/close-room-dialog/close-room-dialog.component';
import { TransferRoomDialogComponent } from './components/transfer-room-dialog/transfer-room-dialog.component';
import { AddRoomDialogEmployeeComponent } from './components/chat-page/employee/add-room-dialog-employee/add-room-dialog-employee.component';
import { ChatDashboardPageComponent } from './pages/chat-dashboard-page/chat-dashboard-page.component';
import { ChatBoxHeaderEmployeeComponent } from './components/chat-page/employee/chat-box-header-employee/chat-box-header-employee.component';
import { ChatBoxHeaderCustomerComponent } from './components/chat-page/customer/chat-box-header-customer/chat-box-header-customer.component';
import { ChatBoxFooterEmployeeComponent } from './components/chat-page/employee/chat-box-footer-employee/chat-box-footer-employee.component';
import { ChatBoxFooterCustomerComponent } from './components/chat-page/customer/chat-box-footer-customer/chat-box-footer-customer.component';
import { AddRoomDialogCustomerComponent } from './components/chat-page/customer/add-room-dialog-customer/add-room-dialog-customer.component';
import { RoomOrderListCustomerComponent } from './components/chat-page/customer/room-order-list-customer/room-order-list-customer.component';
import { RoomOrderListEmployeeComponent } from './components/chat-page/employee/room-order-list-employee/room-order-list-employee.component';


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
    AddSectorDialogComponent,
    UploadFileDialogComponent,
    HeaderDialogUploadFilePipe,
    EditRoomDialogComponent,
    EditRoomDialogRoomStatusPipe,
    CloseRoomDialogComponent,
    TransferRoomDialogComponent,
    AddRoomDialogEmployeeComponent,
    ChatDashboardPageComponent,
    ChatBoxHeaderEmployeeComponent,
    ChatBoxHeaderCustomerComponent,
    ChatBoxFooterEmployeeComponent,
    ChatBoxFooterCustomerComponent,
    AddRoomDialogCustomerComponent,
    RoomOrderListCustomerComponent,
    RoomOrderListEmployeeComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SharedModule
  ]
})
export class ChatModule { }
