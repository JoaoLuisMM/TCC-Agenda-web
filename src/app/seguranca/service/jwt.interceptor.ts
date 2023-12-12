import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {AuthService} from './auth.service';

export class NotAuthenticatedError { }

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlsPermitidas = ['/oauth2/token', 'logout', 'novo-cadastro', 'nova-senha', 'altera-senha'];
    const permite = urlsPermitidas.filter(url => request.url.includes(url)).length > 0;
    if (!permite && this.authService.isAccessTokenInvalido()) {
      return from(this.authService.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {
            if (this.authService.isAccessTokenInvalido()) {
              throw new NotAuthenticatedError();
            }
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            return next.handle(request);
          })
        );
    }
    return next.handle(request);
  }

  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }
}
