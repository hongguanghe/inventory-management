import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  baseUrl: string = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<string[]> {
    let API_URL = `${this.baseUrl}/categories`;
    return this.http.get<string[]>(API_URL, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  createProduct(data: any): Observable<any> {
    let API_URL = `${this.baseUrl}/product/create`;
    return this.http.post(API_URL, data)
    .pipe(
      catchError(this.error)
    ); 
  }

  getAllProducts(): Observable<ProductStorage[]> {
    let API_URL = `${this.baseUrl}/products/all`;
    return this.http.get<ProductStorage[]>(API_URL, {headers: this.headers})
    .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

export interface ProductStorage {
  name: string;
  productId: number;
  brand: string;
  category: string;
  price: number;
  onSale: boolean;
  location: string;
  cost: number;
  quantities: number;
  batches: BatchStorage[];
}

export interface BatchStorage {
  batchId: number;
  quantities: number;
  cost: number;
  manufacturer: string;
  purchasedDate: Date;
  expirationDate: Date;
  productId: number;
  product: ProductStorage;
}

