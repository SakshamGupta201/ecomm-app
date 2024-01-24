import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private apiUrl = 'http://localhost:3000/seller';
  constructor(private http: HttpClient) {}

  userSignUp(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, data).pipe(
      catchError((error) => {
        return throwError(() => new Error('An Error occurred while signUp'));
      })
    );
  }
}
