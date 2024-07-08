import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/model/pageable/pageable';
import { UserDtoList } from '../model/user-dto-list';
import { first, Observable } from 'rxjs';
import { UserDto } from '../model/user-dto';
import { AccountCredentials } from '../model/account-credentials';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_URL = '/v1/user'

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

  findById(id: number): Observable<UserDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<UserDto>(
        this.USER_URL + `/${id}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  save(body: AccountCredentials) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
              .post<UserDto>(
                this.USER_URL,
                body,
                { headers }
              )
              .pipe(
                first()
              )
  }

  updateById(id: number, body: UserDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .put<UserDto>(
        this.USER_URL + `/${id}`,
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
        this.USER_URL + `/${id}`,
        { headers }
      ).pipe(
        first()
      )
  }

  private getAccessToken(): string {

    return localStorage.getItem('accessToken') || ''
  }

}
