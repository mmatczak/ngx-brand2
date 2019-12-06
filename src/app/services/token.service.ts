import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, delay, tap} from 'rxjs/operators';

export interface Token {
  brand: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService implements Resolve<Token> {
  private brandSubject = new BehaviorSubject<string>(null);
  brandChanges = this.brandSubject.asObservable();

  constructor(private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Token> {
    if (route.paramMap.has('token')) {
      const token = route.paramMap.get('token');
      return this.decodeToken(token)
        .pipe(
          catchError(error => {
            this.navigateToErrorPage();
            return throwError(error);
          }),
          tap(decodedToken => this.brandSubject.next(decodedToken.brand))
        );
    }
    this.navigateToErrorPage();
  }

  private navigateToErrorPage() {
    return this.router.navigateByUrl('/invalid-token');
  }

  decodeToken(token: string): Observable<Token> {
    // todo return this.httpClient.get('tokenized/' + token);
    return of({brand: token})
      .pipe(delay(500));
    // return throwError('error')
    //   .pipe(delay(500));
  }
}
