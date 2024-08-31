import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageCreationDto } from '../model/message/message-creation-dto';
import { MessageDto } from '../model/message/message-dto';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly MESSAGE_URL = '/v1/message'

  constructor(
    private _httpClient: HttpClient
  ) { }

  create(body: MessageCreationDto) {

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAccessToken()
    })

    return this._httpClient
              .post<MessageDto>(
                this.MESSAGE_URL,
                body,
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
