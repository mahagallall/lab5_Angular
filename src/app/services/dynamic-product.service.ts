import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicProductService {
  private API_URL: string = 'http://localhost:7777/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.API_URL);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.API_URL}/${id}`);
  }

  addProduct(newProductFromForm: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.API_URL, newProductFromForm);
  }

  updateProduct(updatedProduct: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.API_URL}/${updatedProduct.id}`, updatedProduct);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.API_URL}/${id}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:7777/categories');
  }
}