import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/model/pageable/pageable';
import { UserDtoList } from '../model/user-dto-list';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_URL = '/v1/user'

  constructor(
    private _httpClient: HttpClient
  ) { }

  customPageable(accessToken: string, pageable: Pageable) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    })

    let params = new HttpParams()
      .set('pageNumber', pageable.pageNumber.toString())
      .set('pageSize', pageable.pageSize.toString())
      .set('sortBy', pageable.sortBy)
      .set('direction', pageable.direction)
      .set('name', pageable.queryParams?.get('name') || '')
      .set('permission', pageable.queryParams?.get('permission') || '')

    return this._httpClient
              .get<UserDtoList>(
                this.USER_URL,
                { headers, params }
              )
              .pipe(
                first()
              )
  }

}
