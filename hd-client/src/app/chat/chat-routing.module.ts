import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorsPageComponent } from './pages/sectors-page/sectors-page.component';
import { ChatHomePageComponent } from './pages/chat-home-page/chat-home-page.component';
import { ManageSectorPageComponent } from './pages/manage-sector-page/manage-sector-page.component';

const routes: Routes = [
  { path: 'chat/home', component: ChatHomePageComponent },
  { path: 'chat/sectors', component: SectorsPageComponent },
  { path: 'chat/sector/info/:id', component: ManageSectorPageComponent },
  { path: 'chat/sector/edit/:id', component: ManageSectorPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
