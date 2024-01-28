import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Login, User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  private apiUrl = 'http://localhost:3000/seller';
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: User) {
    return this.http
      .post<User>(this.apiUrl, data, {
        observe: 'response',
      })
      .subscribe((data) => {
        this.isSellerLoggedIn.next(true);
        //* Adding Data to Local Storage
        localStorage.setItem('seller', JSON.stringify(data.body));
        this.router.navigate(['/seller-home']);
      });
  }

  reloadSeller() {
    let seller = localStorage.getItem('seller');
    if (seller) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['/seller-home']);
    }
  }

  userSignIn(data: Login) {
    return this.http
      .get<User>(
        this.apiUrl + `?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((response: any) => {
        if (response.body && response.body.length) {
          console.log(response);
          //* Adding Data to Local Storage
          localStorage.setItem('seller', JSON.stringify(response.body));
          this.router.navigate(['/seller-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
