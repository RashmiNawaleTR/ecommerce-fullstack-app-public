import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order, OrderRequest } from '../../shared/models/order.model';
import { PageResponse } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly API_URL = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(request: OrderRequest): Observable<Order> {
    return this.http.post<Order>(this.API_URL, request);
  }

  getOrders(page: number = 1, limit: number = 20): Observable<PageResponse<Order>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<PageResponse<Order>>(this.API_URL, { params });
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.API_URL}/${id}/status`, { status });
  }
}
