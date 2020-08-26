import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api';
const userUrl = '/user';
const accountUrl = '/account';
const transactionUrl = '/transaction';
const jointaccountUrl = '/jointaccount';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAccount(id: string): Observable<any> {
    const url = `${accountUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getJointAccount(id: string): Observable<any> {
    const url = `${jointaccountUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getTransactions(id: string): Observable<any> {
    console.log('get all trans');
    const url = `${transactionUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  getJointAccountByUser(id: string): Observable<any> {
    console.log('get all accounts');
    const url = `${jointaccountUrl}/userid/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getAccountByUser(id: string): Observable<any> {
    console.log('get all accounts');
    const url = `${accountUrl}/userid/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  createUser(data): Observable<any> {
    return this.http.post(userUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postAccount(data): Observable<any> {
    return this.http.post(accountUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  postJointAccount(data): Observable<any> {
    return this.http.post(jointaccountUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }

  postTransaction(data): Observable<any> {
    console.log('add1',data);
    return this.http.post(transactionUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  }
  checkLogin(data): Observable<any> {
    console.log('login')
    const url = `${userUrl}/${data.username}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  /*deleteBook(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }*/
}
