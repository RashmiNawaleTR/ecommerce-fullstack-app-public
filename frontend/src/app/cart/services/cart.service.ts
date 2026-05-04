import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cart, CartItemRequest } from '../../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly API_URL = `${environment.apiUrl}/cart`;

  private cartSubject = new BehaviorSubject<Cart>({ items: [], subtotal: 0, total: 0 });
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadCart(): Observable<Cart> {
    return this.http.get<Cart>(this.API_URL).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  addToCart(request: CartItemRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.API_URL}/items`, request).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  updateQuantity(productId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.API_URL}/items/${productId}`, { quantity }).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  removeFromCart(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.API_URL}/items/${productId}`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.API_URL).pipe(
      tap(() => this.cartSubject.next({ items: [], subtotal: 0, total: 0 }))
    );
  }

  getCartItemCount(): number {
    const cart = this.cartSubject.value;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
