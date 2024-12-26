import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api = 'https://fakestoreapi.com/';

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<any>(this.api + 'products').pipe(map((res: any) => res));
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api + 'products', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}products/${product.id}`, product).pipe(
      map(response => response), // Transform response if necessary
      catchError(error => {
        console.error('Error updating product', error);
        throw error; // or handle error properly
      })
    );
  }

  getProduitById(id: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.api + 'products/' + id);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.api + 'products/categories');
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.api}products/category/${category}`);
  }
}
