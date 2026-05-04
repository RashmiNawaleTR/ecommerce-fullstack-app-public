import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './auth/guards/auth.guard';
import { autoLoginGuard } from './auto-login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'products',
    canActivate: [autoLoginGuard],
    loadComponent: () => import('./product/components/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'products/:id',
    canActivate: [autoLoginGuard],
    loadComponent: () => import('./product/components/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('./cart/components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./order/components/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () => import('./order/components/order-list/order-list.component').then(m => m.OrderListComponent)
  },
  {
    path: 'orders/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./order/components/order-detail/order-detail.component').then(m => m.OrderDetailComponent)
  },
  {
    path: 'admin/products',
    canActivate: [adminGuard],
    loadComponent: () => import('./product/components/product-manage/product-manage.component').then(m => m.ProductManageComponent)
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
