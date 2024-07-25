import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/model/pageable/pageable';
import { KnowledgeDtoList } from '../model/knowledge-dto-list';
import { first, Observable } from 'rxjs';
import { KnowledgeDto } from '../model/knowledge-dto';

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

  findById(id: number): Observable<KnowledgeDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<KnowledgeDto>(
        this.KNOWLEDGE_URL + `/${id}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  save(body: KnowledgeDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
              .post<KnowledgeDto>(
                this.KNOWLEDGE_URL,
                body,
                { headers }
              )
              .pipe(
                first()
              )
  }

  updateById(id: number, body: KnowledgeDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .put<KnowledgeDto>(
        this.KNOWLEDGE_URL + `/${id}`,
        body,
        { headers }
      )
      .pipe(
        first()
      )
  }

  deleteById(id: number) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .delete(
        this.KNOWLEDGE_URL + `/${id}`,
        { headers }
      ).pipe(
        first()
      )
  }


  private getAccessToken(): string {

    return localStorage.getItem('accessToken') || ''
  }
}
