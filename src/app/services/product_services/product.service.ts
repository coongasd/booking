import { Product } from './../../product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:5000/api/product';
  constructor(private http: HttpClient) { }

  // get product by category
  getProduct(category: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }
  updateProduct(product: any, id: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,product);
  }
  deleteProduct(id: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  getAllProduct():Observable<Product[]>
  {
    return this.http.get<Product[]>(`${this.apiUrl}?category=all`);
  }

  postProduct(product: any): Observable<any>{
    return this.http.post(this.apiUrl,product);
  }

  getProductDetail(id: string):Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }
} 
