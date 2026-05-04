import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductRequest, PageResponse } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(
    page: number = 1,
    limit: number = 20,
    category?: string,
    search?: string,
    sortBy: string = 'createdAt',
    sortOrder: string = 'desc'
  ): Observable<PageResponse<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    if (category) {
      params = params.set('category', category);
    }

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PageResponse<Product>>(this.API_URL, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  createProduct(request: ProductRequest, image?: File): Observable<Product> {
    const formData = this.createFormData(request, image);
    return this.http.post<Product>(this.API_URL, formData);
  }

  updateProduct(id: number, request: ProductRequest, image?: File): Observable<Product> {
    const formData = this.createFormData(request, image);
    return this.http.put<Product>(`${this.API_URL}/${id}`, formData);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  private createFormData(request: ProductRequest, image?: File): FormData {
    const formData = new FormData();
    formData.append('name', request.name);
    formData.append('description', request.description);
    formData.append('price', request.price.toString());
    formData.append('stock', request.stock.toString());

    if (request.category) {
      formData.append('category', request.category);
    }

    if (image) {
      formData.append('image', image);
    }

    return formData;
  }
}
