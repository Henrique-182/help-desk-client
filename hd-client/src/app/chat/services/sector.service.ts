import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SectorDtoList } from '../model/sector/sector-dto-list';
import { Pageable } from '../../shared/model/pageable/pageable';
import { first, Observable } from 'rxjs';
import { SectorDto } from '../model/sector/sector-dto';
import { SimpleSectorWrapperDto } from '../model/sector/simple-sector-wrapper-dto';
import { UserSctrWrapperDto } from '../model/sector/user-sctr-wrapper-dto';
import { SectorCreationDto } from '../model/sector/sector-creation.dto';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private readonly SECTOR_URL = '/v1/sector'

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
      .set('description', pageable.queryParams?.get('queryDescription') || '')
      .set('customerName', pageable.queryParams?.get('queryCustomerName') || '')
      .set('employeeName', pageable.queryParams?.get('queryEmployeeName') || '')

    return this._httpClient
              .get<SectorDtoList>(
                this.SECTOR_URL,
                { headers, params }
              )
              .pipe(
                first()
              )
  }

  findById(id: number): Observable<SectorDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<SectorDto>(
        this.SECTOR_URL + `/${id}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  findUsersByType(type: string): Observable<UserSctrWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<UserSctrWrapperDto>(
        this.SECTOR_URL + `/byType/${type}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  findSectorByUser(): Observable<SimpleSectorWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<SimpleSectorWrapperDto>(
        this.SECTOR_URL + `/byUser`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  findUsersBySector(type: string, id: number): Observable<UserSctrWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
              .get<UserSctrWrapperDto>(
                this.SECTOR_URL + `/bySector/${type}/${id}`,
                { headers }
              )
              .pipe(
                first()
              )
  }

  save(body: SectorCreationDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
              .post<SectorDto>(
                this.SECTOR_URL,
                body,
                { headers }
              )
              .pipe(
                first()
              )
  }

  updateById(id: number, body: SectorDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .put<SectorDto>(
        this.SECTOR_URL + `/${id}`,
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
        this.SECTOR_URL + `/${id}`,
        { headers }
      ).pipe(
        first()
      )
  }

  private getAccessToken(): string {

    return localStorage.getItem('accessToken') || ''
  }

}
