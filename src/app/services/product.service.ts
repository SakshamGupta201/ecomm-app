import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient, private router: Router) {}

  addProduct(data: Product): Observable<void> {
    return this.http.post<void>(this.apiUrl, data);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl + `/${product.id}`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + `/${id}`);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl + `/${id}`);
  }
}
