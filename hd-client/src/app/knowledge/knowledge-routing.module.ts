import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgesPageComponent } from './pages/knowledges-page/knowledges-page.component';
import { ManageKnowledgePageComponent } from './pages/manage-knowledge-page/manage-knowledge-page.component';

const routes: Routes = [
  { path: 'knowledge/list', component: KnowledgesPageComponent },
  { path: 'knowledge/info/:id', component: ManageKnowledgePageComponent },
  { path: 'knowledge/edit/:id', component: ManageKnowledgePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeRoutingModule { }
