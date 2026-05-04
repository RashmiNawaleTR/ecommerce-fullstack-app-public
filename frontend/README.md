# E-Commerce Frontend

Secure e-commerce frontend built with Angular 17, Angular Material, and TypeScript.

## Features

- **Authentication**: Login/Register with JWT tokens
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout**: Place orders with shipping information
- **Order History**: View past orders
- **Admin Panel**: Product management (create, update, delete)
- **Responsive Design**: Mobile-friendly with Angular Material

## Tech Stack

- Angular 17+
- TypeScript
- Angular Material
- RxJS
- Standalone Components

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8080`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Update `src/environments/environment.ts` with your API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

### 3. Run Development Server

```bash
npm start
```

Navigate to `http://localhost:4200`

## Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/app/
├── auth/
│   ├── components/      # Login, Register
│   ├── services/        # AuthService
│   └── guards/          # Route guards
├── product/
│   ├── components/      # Product list, detail, management
│   └── services/        # ProductService
├── cart/
│   ├── components/      # Shopping cart
│   └── services/        # CartService
├── order/
│   ├── components/      # Checkout, order list, order detail
│   └── services/        # OrderService
└── shared/
    ├── models/          # TypeScript interfaces
    └── services/        # HTTP interceptor
```

## Key Features Implementation

### Authentication Flow
1. User registers or logs in
2. JWT token stored in localStorage
3. HTTP interceptor attaches token to all API requests
4. Auth guard protects authenticated routes
5. Automatic logout on 401 responses

### Shopping Experience
1. Browse products (public)
2. Search and filter products
3. Add products to cart (requires login)
4. Update cart quantities
5. Checkout and place order
6. View order history

### Admin Features
1. Admin users can access `/admin/products`
2. Create new products with image upload
3. Update existing products
4. Soft delete products
5. Manage inventory

## Security Features

### Client-Side Validation
- Email format validation
- Password strength (min 12 characters)
- Required field validation
- Real-time form validation feedback

### Authentication
- JWT tokens with automatic attachment
- Secure token storage
- Route guards for protected pages
- Auto-logout on session expiry

### Input Sanitization
- Angular's built-in XSS protection
- Form validation on all inputs
- File upload validation (type and size)

## Available Routes

- `/` - Redirects to products
- `/login` - Login page
- `/register` - Registration page
- `/products` - Product catalog (public)
- `/products/:id` - Product details (public)
- `/cart` - Shopping cart (authenticated)
- `/checkout` - Checkout page (authenticated)
- `/orders` - Order history (authenticated)
- `/orders/:id` - Order details (authenticated)
- `/admin/products` - Product management (admin only)

## Development Tips

### Create New Component
```bash
ng generate component path/component-name --standalone
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
ng lint
```

## Common Issues

### CORS Errors
- Ensure backend CORS is configured for `http://localhost:4200`
- Check `app.cors.allowed-origins` in backend `application.properties`

### 401 Unauthorized
- Check if token is valid
- Verify backend is running
- Clear localStorage and login again

### Module Not Found
- Run `npm install` to install dependencies
- Check import paths in components

## Production Checklist

- [ ] Update `environment.prod.ts` with production API URL
- [ ] Enable production mode
- [ ] Configure SSL/HTTPS
- [ ] Set up CDN for static assets
- [ ] Enable service worker for PWA
- [ ] Optimize bundle size
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics
- [ ] Set up CI/CD pipeline

## Component Status

### Completed
- ✅ App shell with navigation
- ✅ Login component
- ✅ Register component
- ✅ Product list with pagination
- ✅ Authentication service
- ✅ HTTP interceptor
- ✅ Route guards

### Pending (Placeholder implementations)
- ⏳ Product detail page
- ⏳ Product management (admin)
- ⏳ Shopping cart page
- ⏳ Checkout flow
- ⏳ Order history
- ⏳ Order details

These can be fully implemented following the same patterns as the completed components.

## License

MIT
