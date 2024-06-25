export interface TokenResponse {

    username: string,
    authenticated: boolean,
    accessToken: string,
    refreshToken: string,
    creation: Date,
    expiration: Date
    
}
