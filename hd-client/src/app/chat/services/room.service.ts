import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { RoomDto } from '../model/room/room-dto';
import { RoomWrapperDto } from '../model/room/room-wrapper-dto';
import { RoomStatus } from '../model/room/room-status-enum';
import { RoomCreationDto } from '../model/room/room-creation-dto';
import { RoomUpdateDto } from '../model/room/room-update-dto';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly ROOM_URL = '/v1/room'

  constructor(
    private _httpClient: HttpClient
  ) { }

  findByCode(code: number): Observable<RoomDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<RoomDto>(
        this.ROOM_URL + `/${code}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  findBySector(sectorKey: number, statusList: RoomStatus[]): Observable<RoomWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    let params = new HttpParams()
      .set('status1', statusList[0] || '')
      .set('status2', statusList[1] || '')
      .set('status3', statusList[2] || '')
      .set('status4', statusList[3] || '')
      .set('status5', statusList[4] || '')

    return this._httpClient
      .get<RoomWrapperDto>(
        this.ROOM_URL + `/bySector/${sectorKey}`,
        { headers, params }
      )
      .pipe(
        first()
      )
  }

  findBySectorAndEmployee(sectorKey: number, statusList: RoomStatus[]): Observable<RoomWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    let params = new HttpParams()
      .set('status1', statusList[0] || '')
      .set('status2', statusList[1] || '')
      .set('status3', statusList[2] || '')
      .set('status4', statusList[3] || '')
      .set('status5', statusList[4] || '')

    return this._httpClient
      .get<RoomWrapperDto>(
        this.ROOM_URL + `/bySectorAndEmployee/${sectorKey}`,
        { headers, params }
      )
      .pipe(
        first()
      )
  }

  findBySectorAndCustomerAndStatus(sectorKey: number, statusList: RoomStatus[]): Observable<RoomWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    let params = new HttpParams()
      .set('status1', statusList[0] || '')
      .set('status2', statusList[1] || '')
      .set('status3', statusList[2] || '')
      .set('status4', statusList[3] || '')
      .set('status5', statusList[4] || '')

    return this._httpClient
      .get<RoomWrapperDto>(
        this.ROOM_URL + `/bySectorAndCustomerAndStatus/${sectorKey}`,
        { headers, params }
      )
      .pipe(
        first()
      )
  }

  createByCustomer(body: RoomCreationDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
              .post<RoomDto>(
                this.ROOM_URL + "/byCustomer",
                body,
                { headers }
              )
              .pipe(
                first()
              )
  }

  createByEmployee(body: RoomCreationDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
              .post<RoomDto>(
                this.ROOM_URL + "/byEmployee",
                body,
                { headers }
              )
              .pipe(
                first()
              )
  }

  updateReasonAndSolutionAndPriority(code: number, body: RoomUpdateDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
            .patch<RoomDto>(
              this.ROOM_URL + `/reasonAndSolutionAndPriority/${code}`,
              body,
              { headers }
            )
            .pipe(
              first()
            )
  }

  updateStatusByCode(code: number, body: RoomUpdateDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
            .patch<RoomDto>(
              this.ROOM_URL + `/status/${code}`,
              body,
              { headers }
            )
            .pipe(
              first()
            )
  }

  employeeEnterRoomByCode(code: number) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
            .patch<RoomDto>(
              this.ROOM_URL + `/enterRoom/${code}`,
              null,
              { headers }
            )
            .pipe(
              first()
            )
  }

  transferRoomByCode(code: number, body: RoomUpdateDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
            .patch<RoomDto>(
              this.ROOM_URL + `/transferRoom/${code}`,
              body,
              { headers }
            )
            .pipe(
              first()
            )
  }

  deleteByCode(code: number) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .delete(
        this.ROOM_URL + `/${code}`,
        { headers }
      ).pipe(
        first()
      )
  }

  private getAccessToken(): string {

    return localStorage.getItem('accessToken') || ''
  }
}
