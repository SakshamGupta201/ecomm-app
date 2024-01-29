import { Component } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  name = 'Saksham';
  addProduct(data: Product): void {}
}
