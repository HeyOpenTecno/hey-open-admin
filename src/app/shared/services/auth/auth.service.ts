import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserLogin, UserLoginResponse } from '@shared/models/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: UserLogin): Observable<UserLoginResponse> {
    const path = `${environment.LOGIN_URL}`;
    return this.http.
      post<UserLoginResponse>(path, user)
      .pipe(catchError((error) => throwError(error)));
  }
}
