import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  @ViewChild('addProductForm')
  addProductForm!: NgForm;
  isProductAdded = false;

  constructor(private productService: ProductService) {}

  addProduct(data: Product): void {
    this.productService.addProduct(data).subscribe({
      next: () => {
        console.log('Data Saved Successfully');
        this.isProductAdded = true;
        this.addProductForm.reset();
      },
      error: (error) => {
        console.error('Error while Saving Product', error);
      },
    });
  }
}
