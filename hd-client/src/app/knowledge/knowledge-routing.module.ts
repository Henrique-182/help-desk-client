import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgesPageComponent } from './pages/knowledges-page/knowledges-page.component';

const routes: Routes = [
  { path: 'knowledge/list', component: KnowledgesPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeRoutingModule { }
