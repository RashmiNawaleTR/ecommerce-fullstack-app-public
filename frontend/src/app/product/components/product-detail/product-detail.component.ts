import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="product-detail-container">
      <button mat-button routerLink="/products" class="back-button">
        <mat-icon>arrow_back</mat-icon>
        Back to Products
      </button>

      <div *ngIf="loading" class="loading">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="error" class="error-message">
        <mat-icon>error</mat-icon>
        <h2>{{ error }}</h2>
        <button mat-raised-button color="primary" routerLink="/products">
          Back to Products
        </button>
      </div>

      <mat-card *ngIf="product && !loading" class="product-card">
        <div class="product-content">
          <div class="product-image-section">
            <div class="product-image"
                 [style.backgroundImage]="product.imageUrl ? 'url(' + product.imageUrl + ')' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">
              <mat-icon *ngIf="!product.imageUrl" class="image-placeholder-icon">image</mat-icon>
            </div>
          </div>

          <div class="product-info-section">
            <mat-chip-set>
              <mat-chip>{{ product.category }}</mat-chip>
              <mat-chip [class.in-stock]="product.stock > 0" [class.out-of-stock]="product.stock === 0">
                {{ product.stock > 0 ? 'In Stock: ' + product.stock : 'Out of Stock' }}
              </mat-chip>
            </mat-chip-set>

            <h1>{{ product.name }}</h1>

            <div class="price-section">
              <span class="price">\${{ product.price }}</span>
              <span class="price-label">per unit</span>
            </div>

            <mat-card-content>
              <h3>Description</h3>
              <p class="description">{{ product.description }}</p>

              <div class="product-meta">
                <div class="meta-item">
                  <mat-icon>category</mat-icon>
                  <div>
                    <span class="meta-label">Category</span>
                    <span class="meta-value">{{ product.category }}</span>
                  </div>
                </div>

                <div class="meta-item">
                  <mat-icon>inventory</mat-icon>
                  <div>
                    <span class="meta-label">Stock Available</span>
                    <span class="meta-value">{{ product.stock }} units</span>
                  </div>
                </div>

                <div class="meta-item">
                  <mat-icon>schedule</mat-icon>
                  <div>
                    <span class="meta-label">Added</span>
                    <span class="meta-value">{{ product.createdAt | date:'medium' }}</span>
                  </div>
                </div>
              </div>
            </mat-card-content>

            <mat-card-actions class="actions">
              <button mat-raised-button color="primary" class="add-to-cart-button"
                      (click)="addToCart()"
                      [disabled]="product.stock === 0 || !isAuthenticated">
                <mat-icon>shopping_cart</mat-icon>
                {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
              </button>

              <button mat-raised-button color="accent" routerLink="/cart" *ngIf="isAuthenticated">
                <mat-icon>shopping_bag</mat-icon>
                View Cart
              </button>

              <button mat-stroked-button routerLink="/login" *ngIf="!isAuthenticated">
                <mat-icon>login</mat-icon>
                Login to Purchase
              </button>
            </mat-card-actions>

            <div class="auth-notice" *ngIf="!isAuthenticated">
              <mat-icon>info</mat-icon>
              <span>Please login to add items to cart</span>
            </div>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .product-detail-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .back-button {
      margin-bottom: 20px;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 60px;
    }

    .error-message {
      text-align: center;
      padding: 60px 20px;
      color: #f44336;
    }

    .error-message mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
    }

    .product-card {
      padding: 0;
    }

    .product-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    @media (max-width: 768px) {
      .product-content {
        grid-template-columns: 1fr;
      }
    }

    .product-image-section {
      padding: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
    }

    .product-image {
      width: 100%;
      max-width: 400px;
      height: 400px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .image-placeholder-icon {
      font-size: 120px;
      width: 120px;
      height: 120px;
      color: rgba(255,255,255,0.5);
    }

    .product-info-section {
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    mat-chip-set {
      margin-bottom: 10px;
    }

    mat-chip.in-stock {
      background: #4caf50;
      color: white;
    }

    mat-chip.out-of-stock {
      background: #f44336;
      color: white;
    }

    h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 600;
      line-height: 1.3;
    }

    .price-section {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .price {
      font-size: 36px;
      font-weight: 700;
      color: #1976d2;
    }

    .price-label {
      color: #666;
      font-size: 14px;
    }

    mat-card-content {
      padding: 0;
    }

    h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
      font-weight: 600;
    }

    .description {
      color: #666;
      line-height: 1.6;
      margin: 0 0 30px 0;
    }

    .product-meta {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .meta-item mat-icon {
      color: #1976d2;
    }

    .meta-item > div {
      display: flex;
      flex-direction: column;
    }

    .meta-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .meta-value {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    .actions {
      display: flex;
      gap: 10px;
      padding: 0;
      flex-wrap: wrap;
    }

    .add-to-cart-button {
      flex: 1;
      min-width: 200px;
      height: 48px;
      font-size: 16px;
    }

    .auth-notice {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      background: #fff3cd;
      border-radius: 4px;
      color: #856404;
      font-size: 14px;
    }

    .auth-notice mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  product?: Product;
  loading = false;
  error = '';
  isAuthenticated = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = err.status === 404
          ? 'Product not found'
          : 'Failed to load product details';
        this.snackBar.open(this.error, 'Close', { duration: 3000 });
      }
    });
  }

  addToCart(): void {
    if (!this.product) return;

    this.cartService.addToCart({ productId: this.product.id, quantity: 1 }).subscribe({
      next: () => {
        this.snackBar.open('Added to cart', 'View Cart', { duration: 3000 })
          .onAction()
          .subscribe(() => {
            this.router.navigate(['/cart']);
          });
      },
      error: () => {
        this.snackBar.open('Failed to add to cart', 'Close', { duration: 3000 });
      }
    });
  }
}
