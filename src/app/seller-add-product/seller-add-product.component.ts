import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  @ViewChild('addProductForm')
  addProductForm!: NgForm;
  isProductAdded = false;

  isUpdate = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (response: Product) => {
          debugger;
          let product = response;
          if (product) {
            this.addProductForm.setValue(product);
            this.isUpdate = true;
          }
        },
        error: (error: Error) => {
          console.log('No Product Found with Id => ', error.message);
        },
      });
    }
  }

  addProduct(data: Product): void {
    if (this.isUpdate) {
      this.productService.updateProduct(data).subscribe({
        next: (product) => {
          console.log('Data updated Successfully', product.productName);
          this.router.navigate(['/seller-add-products']);
        },
        error: (error: Error) => {
          console.log('Error Updating Project', error);
        },
      });
    } else {
      this.productService.addProduct(data).subscribe({
        next: () => {
          console.log('Data Saved Successfully');
          this.isProductAdded = true;
        },
        error: (error) => {
          console.error('Error while Saving Product', error);
        },
      });
    }
    this.addProductForm.reset();
  }
}
