import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { RoomEmployeeQuantityWrapperDto } from '../model/dashboard/room-employee-quantity-wrapper-dto';
import { RoomPriorityQuantityWrapperDto } from '../model/dashboard/room-priority-quantity-wrapper-dto';
import { SectorMonthQuantitiesWrapperDto } from '../model/dashboard/sector-month-quantities-wrapper.dto';
import { RoomStatusQuantityWrapperDto } from '../model/dashboard/room-status-quantity-wrapper-dto';

@Injectable({
  providedIn: 'root'
})
export class ChatDashboardService {

  private readonly CHAT_DASHBOARD_URL = '/v1/chat-dashboard'

  constructor(
    private _httpClient: HttpClient
  ) { }

  roomPriorityAndQuantity(initialDate: string, endDate: string): Observable<RoomPriorityQuantityWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<RoomPriorityQuantityWrapperDto>(
        this.CHAT_DASHBOARD_URL + `/roomPriorityAndQuantity/${initialDate}/${endDate}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  roomStatusAndQuantities(initialDate: string, endDate: string): Observable<RoomStatusQuantityWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<RoomStatusQuantityWrapperDto>(
        this.CHAT_DASHBOARD_URL + `/roomStatusQuantity/${initialDate}/${endDate}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  roomEmployeeAndQuantity(initialDate: string, endDate: string): Observable<RoomEmployeeQuantityWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<RoomEmployeeQuantityWrapperDto>(
        this.CHAT_DASHBOARD_URL + `/roomEmployeeQuantity/${initialDate}/${endDate}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  roomCustomerAndQuantity(initialDate: string, endDate: string): Observable<RoomEmployeeQuantityWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<RoomEmployeeQuantityWrapperDto>(
        this.CHAT_DASHBOARD_URL + `/roomCustomerQuantity/${initialDate}/${endDate}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  sectorMonthAndQuantities(year: string): Observable<SectorMonthQuantitiesWrapperDto> {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
      .get<SectorMonthQuantitiesWrapperDto>(
        this.CHAT_DASHBOARD_URL + `/sectorMonthAndQuantities/${year}`,
        { headers }
      )
      .pipe(
        first()
      )
  }

  private getAccessToken(): string {

    return localStorage.getItem('accessToken') || ''
  }

}
