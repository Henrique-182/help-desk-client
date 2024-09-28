import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { KnowledgeDto } from '../../model/knowledge-dto';
import { KnowledgeService } from '../../services/knowledge.service';
import { Pageable } from '../../../shared/model/pageable/pageable';
import { KnowledgeDtoList } from '../../model/knowledge-dto-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { TagDto } from '../../model/tag-dto';

@Component({
  selector: 'app-knowledges-page',
  templateUrl: './knowledges-page.component.html',
  styleUrl: './knowledges-page.component.scss'
})
export class KnowledgesPageComponent implements OnInit {

  username: string

  breadCrumbItems: MenuItem[] = [
    { label: 'Lista de conhecimentos', url: '/knowledge/list' }
  ]

  tableValue: KnowledgeDto[] = [] as KnowledgeDto[]

  totalElements: number = 10
  rows: number = 10
  first: number = 0

  sortBy: string = 'title'
  direction: string = 'asc'
  queryTitle: string = ''
  queryContent: string = ''
  querySoftware: string = ''
  queryTag: string = ''

  tags = [
    { label: 'Tag A', value: 'Tag A' },
    { label: 'Tag B', value: 'Tag B' },
    { label: 'Tag C', value: 'Tag C' },
    { label: 'Tag D', value: 'Tag D' },
    { label: 'Tag E', value: 'Tag E' },
    { label: 'Tag F', value: 'Tag F' },
  ]

  softwares = [
    { label: 'Software A', value: 'Software A' },
    { label: 'Software B', value: 'Software B' },
    { label: 'Software C', value: 'Software C' }
  ]

  isAddKnowledgeDialogVisible: boolean = false

  knowledgeForm: FormGroup = this._formBuilder.group({
    title: [],
    software: [],
    content: [],
    tags: []
  })

  tagsForm = [
    { id: 1, description: 'Tag A' },
    { id: 2, description: 'Tag B' },
    { id: 3, description: 'Tag C' },
    { id: 4, description: 'Tag D' },
    { id: 5, description: 'Tag E' },
    { id: 6, description: 'Tag F' },
  ]

  softwaresForm = [
    { id: 1, description: 'Software A' },
    { id: 2, description: 'Software B' },
    { id: 3, description: 'Software C' },
  ]

  

  constructor(
    private _snackBar: MatSnackBar,
    private _knowledgeService: KnowledgeService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
  }

  ngOnInit() {
    this.knowledgesRequest()
  }

  handlePageEvent(event: any) {
    this.first = event.first
    this.rows = event.rows

    this.knowledgesRequest()
  }

  handleSortEvent(event: any) {
    this.sortBy = event.field
    this.direction = event.order === 1 ? 'asc' : 'desc'
    this.first = 0

    this.knowledgesRequest()
  }

  onRefreshTable() {
    this.knowledgesRequest()
  }

  onClearFilters() {
    this.queryTitle = ''
    this.queryContent = ''
    this.querySoftware = ''
    this.queryTag = ''

    this.rows = 10
    this.first = 0

    this.knowledgesRequest()
  }

  knowledgesRequest() {

    const pageable: Pageable = {
      pageNumber: Math.floor(this.first / this.rows),
      pageSize: this.rows,
      sortBy: this.sortBy,
      direction: this.direction,
      queryParams: new Map<string, string>([
        ['knowledgeTitle', this.queryTitle],
        ['knowledgeContent', this.queryContent],
        ['softwareDescription', this.queryTitle],
        ['tagDescription', this.queryTag],
        ['softwareDescription', this.querySoftware]
      ])
    }

    this._knowledgeService.customPageable(pageable)
      .subscribe({
        next: (data: KnowledgeDtoList) => {
          if (data.page.totalElements !== 0) {
            this.tableValue = data._embedded.knowledgeVOList

            this.totalElements = data.page.totalElements
          } else {
            this.tableValue = []
            this.rows = 0
            this.first = 0
            this.totalElements = 0
          }
        },
        error: (err) => {
          this.showSnackBar('Erro ao carregar conhecimentos. Tenta novamente mais tarde!', 'Ok!', 3000)
          console.log(err)
        }
      })
  }

  onAddKnowledge() {
    this.isAddKnowledgeDialogVisible = true
  }

  onKnowledgeReport() {

  }

  onGetKnowledge(knowledge: KnowledgeDto) {
    this._router.navigate([`knowledge/info/${knowledge.key}`])
  }

  onEditKnowledge(knowledge: KnowledgeDto) {
    this._router.navigate([`knowledge/edit/${knowledge.key}`])
  }

  async onDeleteKnowledge(knowledge: KnowledgeDto) {
    try {
      const knowledge$ = this._knowledgeService.deleteById(knowledge.key)

      await firstValueFrom(knowledge$)
      
      this.showSnackBar('Conhecimento excluído com sucesso!', 'Ok!', 3000)

      this.knowledgesRequest()
    } catch (err) {
      this.showSnackBar('Não foi possível excluir o conhecimento. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async onSave() {
    try {
      const knowledge$ = this._knowledgeService.save(this.knowledgeForm.value)

      const knowledge = await firstValueFrom(knowledge$)

      this.showSnackBar('Conhecimento salvo com sucesso!', 'Ok!', 3000)

      this._router.navigate([`knowledge/info/${knowledge.key}`])
    } catch (err) {
      this.showSnackBar('Não foi possível salvar o conhecimento. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }
}
