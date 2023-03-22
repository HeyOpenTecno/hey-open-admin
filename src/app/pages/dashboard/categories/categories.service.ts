import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<any> {
    const path = `${environment.GET_CATERGORIES_URL}`;
    return this.http
      .get<any>(path)
      .pipe(catchError((error) => throwError(error)));
  }

  public getCategory(categoryId): Observable<any>  {
    const path = `${environment.GET_CATEGORY_URL}`.replace(
      ':id',
      categoryId
    );
    return this.http
      .get<any>(path)
      .pipe(catchError((error) => throwError(error)));
  }

  public addCategory(category: any): Observable<any> {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const path = `${environment.POST_CATERGORIES_URL}`;
    return this.http
    .post<any>(path, category, httpOptions)
    .pipe(catchError((error) => throwError(error)));
  }

  public deleteCategory(categoryId: any): Observable<any> {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    const path = `${environment.DELETE_CATERGORIES_URL}`.replace(
      ':id',
      categoryId
    );
    return this.http
    .delete<any>(path, httpOptions)
    .pipe(catchError((error) => throwError(error)));
  }

  public updateCategory(categoryId: string, category: any): Observable<any> {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };

    const path = `${environment.UPDATE_CATEGORY_URL}`.replace(
      ':id',
      categoryId
    );
    return this.http
    .put<any>(path, category, httpOptions)
    .pipe(catchError((error) => throwError(error)));
  }
}
