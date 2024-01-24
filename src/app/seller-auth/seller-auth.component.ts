import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { User } from '../interfaces/user';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  @ViewChild('sellerSignUpForm', { static: false }) sellerSignUpForm!: NgForm;

  constructor(private sellerService: SellerService, private router: Router) {}

  signUpForm(data: User) {
    if (this.sellerSignUpForm.valid) {
      this.sellerService.userSignUp(data).subscribe({
        next: (response) => {
          console.log('Data added Sucessfully');
          this.sellerSignUpForm.reset();
          this.router.navigate(['/seller-home']);
        },
        error: (error) => {
          console.error('Error updating data:', error);
        },
      });
    } else {
      Object.values(this.sellerSignUpForm.controls).forEach((controls) => {
        controls.markAsTouched();
      });
    }
  }
}
