import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormAction } from '../../../shared/enums/form-action';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { KnowledgeService } from '../../services/knowledge.service';
import { firstValueFrom } from 'rxjs';
import { KnowledgeDto } from '../../model/knowledge-dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-knowledge-page',
  templateUrl: './manage-knowledge-page.component.html',
  styleUrl: './manage-knowledge-page.component.scss'
})
export class ManageKnowledgePageComponent implements OnInit {
  
  id: number
  username: string
  action: FormAction
  
  breadCrumbItems: MenuItem[] = [
    { label: 'Lista de conhecimentos', url: '/knowledge/list' },
  ]

  knowledgeForm: FormGroup = this._formBuilder.group({
    title: [],
    software: [],
    content: [],
    tags: []
  })
  isFormDisabled: boolean

  tags = [
    { id: 1, description: 'Tag A' },
    { id: 2, description: 'Tag B' },
    { id: 3, description: 'Tag C' },
    { id: 4, description: 'Tag D' },
    { id: 5, description: 'Tag E' },
    { id: 6, description: 'Tag F' },
  ]
  softwares = [
    { id: 1, description: 'Software A' },
    { id: 2, description: 'Software B' },
    { id: 3, description: 'Software C' },
  ]

  knowledge: KnowledgeDto = {} as KnowledgeDto

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _knowledgeService: KnowledgeService
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
    this.action = this._router.url.includes('info') ? FormAction.Get : FormAction.Put
    this.isFormDisabled = this.action === FormAction.Get
    this.id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')

    this.breadCrumbItems.push(
      this.isFormDisabled ? { label: 'Info', url: `/knowledge/info/${this.id}` } : { label: 'Edição', url: `/knowledge/edit/${this.id}` },
      { label: `${this.id}`}
    )
  }

  async ngOnInit() {
    await this.findKnowledgeById()
    this.setFormData()
  }

  async findKnowledgeById() {
    try {
      const knowledge$ = this._knowledgeService.findById(this.id)
      this.knowledge = await firstValueFrom(knowledge$)
    } catch (err) {
      this.showSnackBar('Não foi possível recuperar o conhecimento. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  private async setFormData() {
    this.knowledgeForm = this._formBuilder.group({
      title: new FormControl({ value: this.knowledge.title, disabled: this.isFormDisabled }),
      software: new FormControl({ value: this.knowledge.software, disabled: this.isFormDisabled }),
      content: new FormControl({ value: this.knowledge.content, disabled: this.isFormDisabled }),
      tags: new FormControl({ value: this.knowledge.tags, disabled: this.isFormDisabled })
    })
  }

  onEdit() {
    this._router.navigate([`knowledge/edit/${this.id}`])
  }

  onReturn() {
    this._router.navigate([`knowledge/list`])
  }

  async onDelete() {
    try {
      const knowledge$ = this._knowledgeService.deleteById(this.knowledge.key)

      await firstValueFrom(knowledge$)
      
      this.showSnackBar('Conhecimento excluído com sucesso!', 'Ok!', 3000)

      this._router.navigate(['knowledge/list'])
    } catch (err) {
      this.showSnackBar('Não foi possível excluir o conhecimento. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async onSave() {
    try {
      const knowledge = await firstValueFrom(
        this._knowledgeService
          .updateById(this.knowledge.key, this.knowledgeForm.value)
      )

      this.showSnackBar('Conhecimento salvo com sucesso!', 'Ok!', 3000)

      this._router.navigate([`knowledge/info/${knowledge.key}`])
    } catch (err) {
      this.showSnackBar('Não foi possível salvar o conhecimento. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    } 
  }

  onCancel() {
    this._router.navigate([`knowledge/info/${this.knowledge.key}`])
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }
}
