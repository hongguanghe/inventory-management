import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {
  baseUrl: string = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

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

  deleteBatchById(id: number) {
    let API_URL = `${this.baseUrl}/batches/batch/${id}`;
    let parameters = new HttpParams()
      .set('id', id)

    this.http.delete(API_URL, { headers: this.headers, params: parameters, observe: 'response' })
      .pipe(catchError(this.error))
      .subscribe(() => this.openSnackBar("Batch Deleted", "Dismiss", "default-snackbar"))
  }

  openSnackBar(message: string, action: string, style: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: [style]
    });
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
