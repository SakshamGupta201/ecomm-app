import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Login, User } from '../interfaces/user';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  @ViewChild('sellerSignUpForm', { static: false }) sellerSignUpForm!: NgForm;

  showLogin = false;
  authError = false;

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signUpForm(data: User): void {
    if (this.sellerSignUpForm.valid) {
      this.sellerService.userSignUp(data);
      // .subscribe({
      //   next: (response) => {
      //     console.log('Data added Sucessfully');
      //     this.sellerSignUpForm.reset();
      //     this.router.navigate(['/seller-home']);
      //   },
      //   error: (error) => {
      //     console.error('Error updating data:', error);
      //   },
      // });
    } else {
      Object.values(this.sellerSignUpForm.controls).forEach((controls) => {
        controls.markAsTouched();
      });
    }
  }

  openLogin() {
    this.showLogin = !this.showLogin;
  }

  signInForm(data: Login): void {
    this.sellerService.userSignIn(data);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) this.authError = true;
    });
  }
}
