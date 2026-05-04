import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderService } from '../../services/order.service';

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  total: number;
  status: string;
  shippingAddress: string;
  createdAt: string;
  orderItems: OrderItem[];
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="order-list-container">
      <h1>My Orders</h1>

      <div *ngIf="loading" class="loading">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="!loading && orders.length === 0" class="empty-state">
        <h2>No orders yet</h2>
        <p>Start shopping to see your orders here!</p>
        <button mat-raised-button color="primary" routerLink="/products">Browse Products</button>
      </div>

      <div *ngIf="!loading && orders.length > 0" class="orders-grid">
        <mat-card *ngFor="let order of orders" class="order-card">
          <mat-card-header>
            <mat-card-title>
              Order #{{ order.id }}
              <mat-chip [class]="'status-' + order.status.toLowerCase()">
                {{ order.status }}
              </mat-chip>
            </mat-card-title>
            <mat-card-subtitle>
              {{ order.createdAt | date:'medium' }}
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="order-items">
              <div *ngFor="let item of order.orderItems" class="order-item">
                <span class="item-name">{{ item.productName }}</span>
                <span class="item-details">
                  Qty: {{ item.quantity }} × $ {{ item.price | number:'1.2-2' }}
                </span>
              </div>
            </div>

            <div class="order-details">
              <p><strong>Shipping Address:</strong> {{ order.shippingAddress }}</p>
              <p class="total"><strong>Total:</strong> $ {{ order.total | number:'1.2-2' }}</p>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/orders', order.id]">
              View Details
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .order-list-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 30px;
      color: #333;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 60px;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-state h2 {
      color: #666;
      margin-bottom: 10px;
    }

    .empty-state p {
      color: #999;
      margin-bottom: 20px;
    }

    .orders-grid {
      display: grid;
      gap: 20px;
    }

    .order-card {
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .order-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    mat-chip {
      font-size: 12px;
      min-height: 24px;
      padding: 0 8px;
    }

    .status-delivered {
      background: #4caf50 !important;
      color: white !important;
    }

    .status-shipped {
      background: #2196f3 !important;
      color: white !important;
    }

    .status-processing {
      background: #ff9800 !important;
      color: white !important;
    }

    .status-pending {
      background: #9e9e9e !important;
      color: white !important;
    }

    .status-cancelled {
      background: #f44336 !important;
      color: white !important;
    }

    .order-items {
      margin: 15px 0;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .order-item:last-child {
      border-bottom: none;
    }

    .item-name {
      font-weight: 500;
      color: #333;
    }

    .item-details {
      color: #666;
      font-size: 14px;
    }

    .order-details {
      margin-top: 15px;
    }

    .order-details p {
      margin: 8px 0;
      color: #666;
    }

    .total {
      font-size: 18px;
      color: #3f51b5 !important;
      margin-top: 15px !important;
      padding-top: 15px;
      border-top: 2px solid #e0e0e0;
    }
  `]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (response: any) => {
        this.orders = response.data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load orders:', error);
        this.loading = false;
      }
    });
  }
}
