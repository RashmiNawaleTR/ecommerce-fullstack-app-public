import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../../shared/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="cart-container">
      <h1>Shopping Cart</h1>

      <div *ngIf="cart && cart.items.length > 0; else emptyCart" class="cart-content">
        <mat-card class="cart-items">
          <mat-card-content>
            <div *ngFor="let item of cart.items" class="cart-item">
              <div class="item-image"
                   [style.backgroundImage]="item.product.imageUrl ? 'url(' + item.product.imageUrl + ')' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">
              </div>

              <div class="item-details">
                <h3>{{ item.product.name }}</h3>
                <p class="item-price">\${{ item.product.price }}</p>
                <p class="item-category">{{ item.product.category }}</p>
              </div>

              <div class="item-actions">
                <div class="quantity-controls">
                  <button mat-icon-button (click)="decreaseQuantity(item.product.id, item.quantity)">
                    <mat-icon>remove</mat-icon>
                  </button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button mat-icon-button (click)="increaseQuantity(item.product.id, item.quantity)">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>

                <p class="item-total">\${{ item.itemTotal.toFixed(2) }}</p>

                <button mat-icon-button color="warn" (click)="removeItem(item.product.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="cart-summary">
          <mat-card-header>
            <mat-card-title>Order Summary</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>\${{ cart.subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <mat-divider></mat-divider>
            <div class="summary-row total">
              <span><strong>Total:</strong></span>
              <span><strong>\${{ cart.total.toFixed(2) }}</strong></span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" [routerLink]="['/checkout']" class="checkout-button">
              Proceed to Checkout
            </button>
            <button mat-button color="warn" (click)="clearCart()">
              Clear Cart
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <ng-template #emptyCart>
        <mat-card class="empty-cart">
          <mat-card-content>
            <mat-icon class="empty-icon">shopping_cart</mat-icon>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button mat-raised-button color="primary" [routerLink]="['/products']">
              Browse Products
            </button>
          </mat-card-content>
        </mat-card>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 30px;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 20px;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }
    }

    .cart-items {
      padding: 0;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 100px 1fr auto;
      gap: 20px;
      padding: 20px;
      border-bottom: 1px solid #e0e0e0;
      align-items: center;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .item-image {
      width: 100px;
      height: 100px;
      border-radius: 8px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .item-details h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
    }

    .item-price {
      color: #1976d2;
      font-weight: 500;
      margin: 4px 0;
    }

    .item-category {
      color: #666;
      font-size: 14px;
      margin: 4px 0;
    }

    .item-actions {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 5px;
      background: #f5f5f5;
      border-radius: 20px;
      padding: 5px;
    }

    .quantity {
      min-width: 30px;
      text-align: center;
      font-weight: 500;
    }

    .item-total {
      font-size: 18px;
      font-weight: 600;
      color: #1976d2;
      margin: 0;
    }

    .cart-summary {
      height: fit-content;
      position: sticky;
      top: 20px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
    }

    .summary-row.total {
      font-size: 20px;
      padding-top: 15px;
    }

    mat-divider {
      margin: 15px 0;
    }

    mat-card-actions {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .checkout-button {
      width: 100%;
    }

    .empty-cart {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #ccc;
      margin-bottom: 20px;
    }

    .empty-cart h2 {
      margin: 20px 0 10px;
    }

    .empty-cart p {
      color: #666;
      margin-bottom: 30px;
    }
  `]
})
export class CartComponent implements OnInit {
  cart?: Cart;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.cartService.cart$.subscribe(cart => this.cart = cart);
  }

  loadCart(): void {
    this.cartService.loadCart().subscribe({
      error: (error) => {
        console.error('Failed to load cart:', error);
        this.snackBar.open('Failed to load cart', 'Close', { duration: 3000 });
      }
    });
  }

  increaseQuantity(productId: number, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1).subscribe({
      next: () => {
        this.snackBar.open('Quantity updated', 'Close', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Failed to update quantity', 'Close', { duration: 3000 });
      }
    });
  }

  decreaseQuantity(productId: number, currentQuantity: number): void {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1).subscribe({
        next: () => {
          this.snackBar.open('Quantity updated', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Failed to update quantity', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.removeItem(productId);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Failed to remove item', 'Close', { duration: 3000 });
      }
    });
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart().subscribe({
        next: () => {
          this.snackBar.open('Cart cleared', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Failed to clear cart', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
