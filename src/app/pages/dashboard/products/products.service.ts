import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getProduct(productId: string): Observable<any> {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };
    const path = `${environment.GET_PRODUCT_URL}`.replace(
      ':id',
      productId
    );
    return this.http
      .get<any>(path, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }

  public addProduct(productData: FormData): Observable<any> {
    const token = window.localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    const path = `${environment.GET_PRODUCTS_URL}`;
    return this.http
      .post<any>(path, productData, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }
}
