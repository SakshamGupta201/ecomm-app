import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    });
  }

  updateProduct(id: string): void {
    this.router.navigate(['seller-add-product/', { id: id }]);
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: (product: Product) => {
        console.log('Product deleted successfully ' + product.productName);
      },
      error: (error: Error) => {
        console.log('Some Error Occurred', error);
      },
    });

    this.productList = this.productList.filter((product) => product.id !== id);
  }
}
