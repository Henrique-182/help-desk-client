import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowledgeRoutingModule } from './knowledge-routing.module';
import { SharedModule } from '../shared/shared.module';
import { KnowledgesPageComponent } from './pages/knowledges-page/knowledges-page.component';
import { ManageKnowledgePageComponent } from './pages/manage-knowledge-page/manage-knowledge-page.component';


@NgModule({
  declarations: [
    KnowledgesPageComponent,
    ManageKnowledgePageComponent
  ],
  imports: [
    CommonModule,
    KnowledgeRoutingModule,
    SharedModule
  ]
})
export class KnowledgeModule { }
