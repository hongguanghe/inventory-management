import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  allCategories: string[] | any | undefined
  baseUrl: string = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {
    
  }

  updateBatch(selectedBatch: any) {
    let API_URL = `${this.baseUrl}/batches/batch/${selectedBatch.batchId}`;
    let parameters = new HttpParams()

    this.http.put(API_URL, selectedBatch, { headers: this.headers, params: parameters, observe: 'response' })
      .pipe(catchError(this.error))
      .subscribe(() => this.openSnackBar("Batch Updated", "Dismiss", "default-snackbar"))
  }

  createBatch(selectedBatch: any) {
    let API_URL = `${this.baseUrl}/batches/batch/create`;
    let parameters = new HttpParams();
    
    this.http.post(API_URL, selectedBatch, { headers: this.headers, params: parameters, observe: 'response' })
      .pipe(catchError(this.error))
      .subscribe(() => this.openSnackBar("Batch Created", "Dismiss", "default-snackbar"))
  }

  async fetchCategories(){
    let API_URL = `${this.baseUrl}/categories`;
    return this.http.get<string[]>(API_URL, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  createProduct(product: NewProductStorage){
    debugger;
    let API_URL = `${this.baseUrl}/products/product/create`;

    return this.http.post(API_URL, product, {observe: 'response'})
      .pipe(catchError(this.error))
      .subscribe(() => this.openSnackBar("Product Created", "Dismiss", "default-snackbar"))
  }

  getAllProducts(): Observable<ProductStorage[]> {
    let API_URL = `${this.baseUrl}/products/all`;
    return this.http.get<ProductStorage[]>(API_URL, {headers: this.headers})
    .pipe(catchError(this.error));
  }

  deleteBatchById(id: number){
    let API_URL = `${this.baseUrl}/batches/batch/${id}`;
    let parameters = new HttpParams()
      .set('id', id)

    this.http.delete(API_URL, { headers: this.headers, params: parameters, observe: 'response'})
      .pipe(catchError(this.error))
      .subscribe(() => this.openSnackBar("Batch Deleted", "Dismiss", "default-snackbar"))
  }

  searchProducts(keyword: string, category: string): Observable<ProductStorage[]>{
    let API_URL = `${this.baseUrl}/products/product/search`;
    keyword = keyword.trim();
    let parameters = new HttpParams()
      .set('keyword', keyword)
      .set('category', category);

    return this.http.get<ProductStorage[]>(API_URL, { headers: this.headers, params: parameters})
      .pipe(catchError(this.error));
  }

  getProductsByCategory( category: string): Observable<ProductStorage[]> {
    let API_URL = `${this.baseUrl}/products/product/category`;

    let parameters = new HttpParams()
      .set('category', category);

    return this.http.get<ProductStorage[]>(API_URL, { headers: this.headers, params: parameters })
      .pipe(catchError(this.error))
  }

  updateProduct(product: any) {
    let API_URL = `${this.baseUrl}/products/product/${product.productId}`;

    this.http.put(API_URL, product, { headers: this.headers})
      .pipe(catchError(this.error))
      .subscribe(() => this.openSnackBar("Product Updated", "Dismiss", "default-snackbar"));
    }
  
  deleteProduct(id: number) {
    let API_URL = `${this.baseUrl}/products/product/${id}`;

    let parameters = new HttpParams()
      .set('id', id);

    this.http.delete(API_URL, { headers: this.headers, params: parameters, observe: 'response' })
      .pipe(catchError(this.error))
      .subscribe(() => this.openSnackBar("Product and its batches Deleted", "Dismiss", "default-snackbar"));
  }


  openSnackBar(message: string, action: string, style: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: [style]
    });
  }

  booleanConversion(val: boolean): string {
    return val ? 'Yes' : 'No'
  }

  stringConversion(val: string): boolean {
    return val == 'Yes' ? true : false;
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status} + ', ' + ${error.message}`;
    }

    this.snackbar.open(errorMessage, "Dismiss", {
      duration: 3000,
      panelClass: ["red-snackbar"]
    });

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

export interface ProductRequest {
  name: string;
  productId: number;
  brand: string;
  category: string;
  price: number;
  onSale: boolean;
  location: string;
}

export interface BatchRequest {
  batchId: number;
  quantities: number;
  cost: number;
  manufacturer: string;
  purchasedDate: Date | undefined;
  expirationDate: Date | undefined;
}

export interface NewProductStorage {
  name: string;
  brand: string;
  category: string;
  price: number;
  onSale: boolean;
  location: string;
  batches: NewBatchStorage[];
}

export interface NewBatchStorage {
  quantities: number;
  cost: number;
  manufacturer: string;
  purchasedDate: Date | undefined;
  expirationDate: Date | undefined;
}
