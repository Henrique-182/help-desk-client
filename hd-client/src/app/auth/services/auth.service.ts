import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first, tap } from 'rxjs';
import { AccountCredentials } from '../model/account-credentials';
import { TokenResponse } from '../model/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_URL = 'v1/auth/'

  constructor(
    private _httpClient: HttpClient
  ) { }

  signin(credentials: AccountCredentials) {

    return this._httpClient
              .post<TokenResponse>(
                this.AUTH_URL + 'signin',
                credentials
              )
              .pipe(
                first()
              )

  }

  refresh(username: string, refreshToken: string) {

    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + refreshToken
    })

    return this._httpClient
              .put<TokenResponse>(
                this.AUTH_URL + 'refresh',
                '',
                { headers }
              )
              .pipe(
                first()
              )
  }

}
