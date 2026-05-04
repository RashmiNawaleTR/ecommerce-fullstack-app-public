import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Product } from '../../../shared/models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="product-list-container">
      <h1>Products</h1>

      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Search products</mat-label>
        <input matInput [(ngModel)]="searchTerm" (keyup.enter)="searchProducts()">
      </mat-form-field>

      <div *ngIf="loading" class="loading">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="!loading" class="products-grid">
        <mat-card *ngFor="let product of products">
          <div class="product-image"
               [style.backgroundImage]="product.imageUrl ? 'url(' + product.imageUrl + ')' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">
          </div>
          <mat-card-header>
            <mat-card-title>{{ product.name }}</mat-card-title>
            <mat-card-subtitle>\${{ product.price }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ product.description }}</p>
            <p class="stock-info">Stock: {{ product.stock }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/products', product.id]">View Details</button>
            <button mat-raised-button color="accent"
                    (click)="addToCart(product)"
                    [disabled]="product.stock === 0 || !isAuthenticated">
              Add to Cart
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <mat-paginator
        [length]="totalProducts"
        [pageSize]="pageSize"
        [pageSizeOptions]="[10, 20, 50]"
        (page)="onPageChange($event)"
        *ngIf="!loading">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .product-list-container {
      padding: 20px;
    }

    .search-field {
      width: 100%;
      max-width: 500px;
      margin-bottom: 20px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    mat-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 1;
    }

    .stock-info {
      color: #666;
      font-size: 14px;
      margin-top: 10px;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .product-image {
      height: 200px;
      background-size: cover;
      background-position: center;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  searchTerm = '';
  page = 1;
  pageSize = 20;
  totalProducts = 0;
  isAuthenticated = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(this.page, this.pageSize, undefined, this.searchTerm).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalProducts = response.total;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load products', 'Close', { duration: 3000 });
      }
    });
  }

  searchProducts(): void {
    this.page = 1;
    this.loadProducts();
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({ productId: product.id, quantity: 1 }).subscribe({
      next: () => {
        this.snackBar.open('Added to cart', 'Close', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Failed to add to cart', 'Close', { duration: 3000 });
      }
    });
  }
}
