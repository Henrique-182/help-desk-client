import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/model/pageable/pageable';
import { KnowledgeDtoList } from '../model/knowledge-dto-list';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  private readonly KNOWLEDGE_URL = '/v1/knowledge'

  constructor(
    private _httpClient: HttpClient
  ) { }

  customPageable(pageable: Pageable) {
    
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    let params = new HttpParams()
      .set('pageNumber', pageable.pageNumber.toString())
      .set('pageSize', pageable.pageSize.toString())
      .set('sortBy', pageable.sortBy)
      .set('direction', pageable.direction)
      .set('knowledgeTitle', pageable.queryParams?.get('knowledgeTitle') || '')
      .set('knowledgeContent', pageable.queryParams?.get('knowledgeContent') || '')
      .set('softwareDescription', pageable.queryParams?.get('softwareDescription') || '')
      .set('tagDescription', pageable.queryParams?.get('tagDescription') || '')

    return this._httpClient
              .get<KnowledgeDtoList>(
                this.KNOWLEDGE_URL,
                { headers, params }
              )
              .pipe(
                first()
              )
  }

  private getAccessToken(): string {

    return localStorage.getItem('accessToken') || ''
  }
}
