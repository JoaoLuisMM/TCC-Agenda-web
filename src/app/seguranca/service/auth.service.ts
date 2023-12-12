import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

import {firstValueFrom, Subject} from 'rxjs';
import {environment} from "../../../environments/environment";
import {Usuario} from "../model/usuario.model";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string = `${environment.url}/oauth2/token`;
  oauthAuthorizeUrl: string = `${environment.url}/oauth2/authorize`;
  jwtPayload: any;
  loginObserver = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
  }

  login(): void {
    this.limparAccessToken();
    localStorage.clear();
    const state = this.gerarStringAleatoria(40);
    const codeVerifier = this.gerarStringAleatoria(128);
    localStorage.setItem('state', state);
    localStorage.setItem('codeVerifier', codeVerifier);
    const challengeMethod = 'S256';
    const codeChallenge = CryptoJS.SHA256(codeVerifier)
      .toString(CryptoJS.enc.Base64)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    const redirectURI = encodeURIComponent(environment.oauthCallbackUrl);
    const responseType = 'code';
    const clientId = 'tccJoaoLuis';
    const scope = 'read write';
    const params = [
      `response_type=${responseType}`,
      `client_id=${clientId}`,
      `state=${state}`,
      `redirect_uri=${redirectURI}`,
      `code_challenge=${codeChallenge}`,
      `code_challenge_method=${challengeMethod}`,
      `scope=${scope}`
    ];
    // console.log(JSON.stringify(params.join("&")));
    window.location.href = `${this.oauthAuthorizeUrl}?${params.join("&")}`;
  }

  obterNovoAccessTokenComCode(code: string, state: string): Promise<any> {
    const stateSalvo = localStorage.getItem('state');
    // console.log('authservice -> state: ' + state + ' -- stateSalvo: ' + stateSalvo);
    if (stateSalvo !== state) {
      return Promise.reject(null);
    }
    const codeVerifier = localStorage.getItem('codeVerifier')!;
    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', environment.oauthCallbackUrl)
      .append('code_verifier', codeVerifier);
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic dGNjSm9hb0x1aXM6Sm9Ab0x1MTU=');

    return firstValueFrom(this.httpClient.post<any>(this.oauthTokenUrl, payload, { headers }))
      .then((response: any) => {
        this.armazenarToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        localStorage.removeItem('state');
        localStorage.removeItem('codeVerifier');
        // console.log('Novo access token criado!');
        this.loginObserver.next(true);
        return Promise.resolve({"Teste": "1234234"});
      })
      .catch((response: any) => {
        console.error('Erro ao gerar o token com o code.', JSON.stringify(response));
        this.loginObserver.next(false);
        return Promise.resolve();
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic dGNjSm9hb0x1aXM6Sm9Ab0x1MTU=');
    const payload = new HttpParams()
      .append('grant_type', 'refresh_token')
      .append('refresh_token', localStorage.getItem('refreshToken')!);
    // console.log('\n---> refreshToken: ' + localStorage.getItem('refreshToken')! + '\n')
    return firstValueFrom(this.httpClient.post<any>(this.oauthTokenUrl, payload, {headers}))
      .then((response: any) => {
        this.armazenarToken(response['access_token']);
        this.armazenarRefreshToken(response['refresh_token']);
        console.log('Novo access token criado!');
        return Promise.resolve();
      })
      .catch((response: any) => {
        // console.error('Erro ao renovar token.', JSON.stringify(response));
        //return Promise.resolve();
        this.login();
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: any) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  public armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', this.jwtPayload.usuario);
  }

  public carregarToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
    return token;
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
    this.jwtPayload = null;
  }

  private armazenarRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  private gerarStringAleatoria(tamanho: number) {
    let resultado = '';
    //Chars que são URL safe
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < tamanho; i++) {
      resultado += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return resultado;
  }

  logout() {
    this.limparAccessToken();
    localStorage.clear();
    this.httpClient.delete(`${environment.url}/token/revoke`).subscribe()
    window.location.href = `${environment.url}/logout?redirectTo=${environment.logoutRedirectToUrl}`;
  }

  carregaUsuarioLogado(): Usuario | null {
    const token = this.carregarToken();
    if (token) {
      return new Usuario(this.jwtHelper.decodeToken(token).usuario);
    }
    return null;
  }

  isLogado() {
    return localStorage.getItem('usuario') != null;
  }
}
