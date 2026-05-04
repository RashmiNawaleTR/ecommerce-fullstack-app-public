import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './auth/services/auth.service';
import { CartService } from './cart/services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './shared/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span class="logo" routerLink="/">E-Commerce</span>
      <span class="spacer"></span>

      <button mat-button routerLink="/products">Products</button>

      <ng-container *ngIf="currentUser$ | async as user; else guestMenu">
        <button mat-icon-button routerLink="/cart">
          <mat-icon [matBadge]="cartCount$ | async" matBadgeColor="accent">shopping_cart</mat-icon>
        </button>

        <button mat-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
          {{ user.name }}
        </button>

        <mat-menu #userMenu="matMenu">
          <button mat-menu-item routerLink="/orders">
            <mat-icon>receipt</mat-icon>
            My Orders
          </button>
          <button mat-menu-item *ngIf="user.role === 'ADMIN'" routerLink="/admin/products">
            <mat-icon>admin_panel_settings</mat-icon>
            Manage Products
          </button>
          <button mat-menu-item (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </mat-menu>
      </ng-container>

      <ng-template #guestMenu>
        <button mat-button routerLink="/login">Login</button>
        <button mat-raised-button color="accent" routerLink="/register">Register</button>
      </ng-template>
    </mat-toolbar>

    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .logo {
      cursor: pointer;
      font-size: 24px;
      font-weight: bold;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent implements OnInit {
  currentUser$: Observable<User | null>;
  cartCount$: Observable<number>;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.cartCount$ = this.cartService.cart$.pipe(
      map(cart => cart.items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  ngOnInit(): void {
    // Auto-login if not authenticated
    if (!this.authService.isAuthenticated()) {
      console.log('🔐 Auto-login: Logging in...');
      this.authService.login({
        email: 'customer@test.com',
        password: 'Test123456789!'
      }).subscribe({
        next: () => {
          console.log('✅ Auto-login: Success!');
          this.cartService.loadCart().subscribe();
        },
        error: (err) => {
          console.error('❌ Auto-login failed:', err);
        }
      });
    } else {
      this.cartService.loadCart().subscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
