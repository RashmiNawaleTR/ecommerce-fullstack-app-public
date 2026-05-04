# E-Commerce Application - Tech Stack Breakdown by Screen

## 📊 Overview

This document provides a detailed breakdown of the technology stack used in each screen/feature of the e-commerce application.

---

## 🔐 1. Login Screen (`/login`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatCardModule` - Login card container
  - `MatFormFieldModule` - Input fields
  - `MatInputModule` - Text inputs
  - `MatButtonModule` - Login button
  - `MatSnackBarModule` - Success/error notifications
- **Forms**: 
  - `ReactiveFormsModule` - Form handling
  - `Validators` - Email and password validation
- **State Management**: 
  - `BehaviorSubject` - Current user state
  - `Observable` - Reactive data streams
- **Routing**: 
  - `Router` - Navigation after login
  - `RouterLink` - Link to register page
- **HTTP**: 
  - `HttpClient` - API communication
  - `AuthInterceptor` - JWT token attachment

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `AuthController` (`POST /api/v1/auth/login`)
- **Service**: `AuthService` - Business logic
- **Security**: 
  - `BCryptPasswordEncoder` - Password verification
  - `JwtUtil` - Token generation
- **DTO**: 
  - `LoginRequest` - Input validation
  - `AuthResponse` - Response structure
- **Database**: PostgreSQL via JPA
- **Repository**: `UserRepository` - User lookup

### Security Features
- ✅ Email format validation
- ✅ Password minimum length (12 chars)
- ✅ BCrypt password hashing (strength 12)
- ✅ JWT token generation (15-min expiry)
- ✅ Refresh token (7-day expiry)
- ✅ Rate limiting (5 attempts per 15 min)
- ✅ Audit logging of login attempts

---

## 📝 2. Register Screen (`/register`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatCardModule` - Registration card
  - `MatFormFieldModule` - Input fields
  - `MatInputModule` - Text inputs
  - `MatButtonModule` - Register button
  - `MatSnackBarModule` - Notifications
- **Forms**: 
  - `ReactiveFormsModule` - Form handling
  - Custom Validators - Password strength, email uniqueness
- **State Management**: 
  - `BehaviorSubject` - User state management
- **Routing**: 
  - `Router` - Redirect after registration
  - `RouterLink` - Link to login

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `AuthController` (`POST /api/v1/auth/register`)
- **Service**: `AuthService` - User creation logic
- **Security**: 
  - `BCryptPasswordEncoder` - Password hashing
  - `JwtUtil` - Initial token generation
- **DTO**: 
  - `RegisterRequest` - Input validation with JSR-380
  - `AuthResponse` - Response
- **Database**: 
  - PostgreSQL
  - `UserRepository.save()` - User creation
- **Validation**: 
  - `@Valid` annotation
  - Bean Validation constraints

### Security Features
- ✅ Email format validation
- ✅ Email uniqueness check
- ✅ Password strength validation
- ✅ Password hashing before storage
- ✅ Default role assignment (CUSTOMER)
- ✅ Audit logging

---

## 🛍️ 3. Products List Screen (`/products`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatCardModule` - Product cards
  - `MatButtonModule` - Action buttons
  - `MatInputModule` - Search field
  - `MatFormFieldModule` - Search container
  - `MatPaginatorModule` - Pagination controls
  - `MatProgressSpinnerModule` - Loading indicator
  - `MatSnackBarModule` - Add to cart notifications
- **Forms**: 
  - `FormsModule` - Search input binding
  - `[(ngModel)]` - Two-way binding
- **State Management**: 
  - `BehaviorSubject` - Cart state
  - RxJS Observables - Product data streams
- **Routing**: 
  - `RouterLink` - Product detail navigation
- **HTTP**: 
  - `HttpClient` - API calls
  - `HttpParams` - Query parameters

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `ProductController` (`GET /api/v1/products`)
- **Service**: `ProductService` - Business logic
- **Repository**: `ProductRepository extends JpaRepository`
- **Database**: 
  - PostgreSQL
  - Full-text search support
  - Pagination with `Pageable`
- **DTO**: 
  - `ProductDto` - Response
  - `PageResponse<Product>` - Paginated results
- **Query Features**: 
  - Pagination (default 20 per page)
  - Search by name/description
  - Filter by category
  - Sorting (by createdAt, price, name)

### Security Features
- ✅ Public endpoint (no auth required)
- ✅ Output encoding (HTML sanitization)
- ✅ Rate limiting (100 req/min per user)
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS enabled

### Data Flow
1. User searches/filters products
2. Angular sends GET request with query params
3. Spring Boot queries PostgreSQL with pagination
4. Results returned as JSON
5. Angular displays in grid layout
6. User can add to cart (requires auth)

---

## 📦 4. Product Detail Screen (`/products/:id`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatCardModule` - Product container
  - `MatButtonModule` - Action buttons
  - `MatIconModule` - Icons (back, cart, info)
  - `MatChipsModule` - Category and stock chips
  - `MatProgressSpinnerModule` - Loading state
  - `MatSnackBarModule` - Notifications with actions
- **Routing**: 
  - `ActivatedRoute` - Read product ID from URL
  - `Router` - Navigate to cart
  - `RouterLink` - Back button
- **HTTP**: `HttpClient` - Fetch product details
- **Pipes**: `DatePipe` - Format created date

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `ProductController` (`GET /api/v1/products/{id}`)
- **Service**: `ProductService.findById()`
- **Repository**: `ProductRepository.findById()`
- **Database**: PostgreSQL - Single product query
- **DTO**: `ProductDto` - Full product details
- **Exception Handling**: 
  - `ResourceNotFoundException` (404) if not found

### Security Features
- ✅ Public endpoint (read-only)
- ✅ XSS protection (output encoding)
- ✅ Parameterized query (ID binding)
- ✅ Error handling (no stack trace exposure)

### Image Handling
- **Frontend**: Dynamic background image from URL
- **Backend**: Image URLs stored in database
- **CDN**: Unsplash image service (800x800px optimized)

---

## 🛒 5. Shopping Cart Screen (`/cart`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatCardModule` - Cart container and summary
  - `MatButtonModule` - Action buttons
  - `MatIconModule` - Icons (add, remove, delete)
  - `MatDividerModule` - Visual separators
  - `MatSnackBarModule` - Action notifications
- **State Management**: 
  - `BehaviorSubject` - Cart state
  - RxJS `Observable` - Real-time cart updates
  - `tap` operator - Side effects
- **Routing**: 
  - `RouterLink` - Checkout and products links
  - `authGuard` - Route protection
- **HTTP**: `HttpClient` - Cart operations

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `CartController`
  - `GET /api/v1/cart` - Load cart
  - `POST /api/v1/cart/items` - Add item
  - `PUT /api/v1/cart/items/{productId}` - Update quantity
  - `DELETE /api/v1/cart/items/{productId}` - Remove item
  - `DELETE /api/v1/cart` - Clear cart
- **Service**: `CartService` - Business logic
- **Repository**: `CartItemRepository`
- **Database**: 
  - PostgreSQL
  - `cart_items` table
  - Foreign keys to `users` and `products`
- **DTO**: 
  - `CartDto` - Cart with items
  - `CartItemRequest` - Add/update requests
- **Transactions**: `@Transactional` for data consistency

### Security Features
- ✅ Authentication required (`authGuard`)
- ✅ Authorization (user can only access own cart)
- ✅ JWT token validation
- ✅ Input validation (quantity > 0, max 99)
- ✅ Stock validation before adding
- ✅ Rate limiting (50 req/min)
- ✅ Audit logging

### Business Logic
- Stock availability check
- Automatic quantity increment if item exists
- Subtotal and total calculation
- Real-time cart count in navigation badge

---

## 💳 6. Checkout Screen (`/checkout`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatCardModule` - Checkout form
  - `MatFormFieldModule` - Form fields
  - `MatInputModule` - Address inputs
  - `MatButtonModule` - Submit button
  - `MatStepperModule` - Multi-step checkout (if implemented)
- **Forms**: 
  - `ReactiveFormsModule` - Shipping address form
  - Validators - Required fields
- **Routing**: 
  - `authGuard` - Route protection
  - `Router` - Navigate to order confirmation
- **State Management**: Cart clearing after order

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `OrderController` (`POST /api/v1/orders`)
- **Service**: `OrderService` - Complex order creation
- **Repository**: 
  - `OrderRepository`
  - `OrderItemRepository`
- **Database Transaction**: 
  - PostgreSQL with ACID properties
  - Multi-table operations:
    1. Create order
    2. Create order_items
    3. Decrement product stock
    4. Clear cart
- **DTO**: 
  - `OrderRequest` - Shipping info
  - `OrderDto` - Order response

### Security Features
- ✅ Authentication required
- ✅ Authorization (user's own order)
- ✅ Transaction safety (rollback on failure)
- ✅ Idempotency (prevent duplicate submissions)
- ✅ Input validation (shipping address)
- ✅ Rate limiting (10 orders per hour)
- ✅ PII protection

### Transaction Flow
1. Validate cart not empty
2. Check stock availability for all items
3. Create order record
4. Create order_items from cart
5. Decrement product stock
6. Clear user's cart
7. (Mock) Process payment
8. Return order confirmation

---

## 📜 7. Order History Screen (`/orders`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatCardModule` - Order cards
  - `MatButtonModule` - View details button
  - `MatChipsModule` - Order status chips
  - `MatPaginatorModule` - Pagination
  - `MatTableModule` - Orders table (optional)
- **Routing**: 
  - `authGuard` - Route protection
  - `RouterLink` - Order detail navigation
- **Pipes**: 
  - `DatePipe` - Format order dates
  - `CurrencyPipe` - Format prices

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `OrderController` (`GET /api/v1/orders`)
- **Service**: `OrderService.getUserOrders()`
- **Repository**: 
  - `OrderRepository.findByUserId()`
  - Pagination support
- **Database**: 
  - PostgreSQL
  - Query with JOIN to order_items and products
- **DTO**: `PageResponse<OrderDto>`

### Security Features
- ✅ Authentication required
- ✅ Authorization (user sees only their orders)
- ✅ Admin can see all orders with filters
- ✅ Pagination to prevent data overload

---

## 📋 8. Order Detail Screen (`/orders/:id`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatCardModule` - Order information
  - `MatListModule` - Order items list
  - `MatChipsModule` - Status chip
  - `MatButtonModule` - Actions
- **Routing**: 
  - `ActivatedRoute` - Read order ID
  - `authGuard` - Route protection
- **Pipes**: `DatePipe`, `CurrencyPipe`

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `OrderController` (`GET /api/v1/orders/{id}`)
- **Service**: `OrderService.getOrderById()`
- **Repository**: Fetch order with order_items
- **Database**: 
  - PostgreSQL
  - JOIN query for complete order data
- **DTO**: `OrderDto` with nested `OrderItemDto[]`

### Security Features
- ✅ Authentication required
- ✅ Authorization (owner or admin only)
- ✅ 403 Forbidden if unauthorized

---

## 🔧 9. Admin - Manage Products Screen (`/admin/products`)

### Frontend Technologies
- **Framework**: Angular 17 (Standalone Components)
- **UI Components**: 
  - `MatTableModule` - Products table
  - `MatPaginatorModule` - Table pagination
  - `MatSortModule` - Column sorting
  - `MatDialogModule` - Create/Edit dialog
  - `MatFormFieldModule` - Form inputs
  - `MatButtonModule` - Action buttons
  - `MatIconModule` - Edit/Delete icons
- **Forms**: 
  - `ReactiveFormsModule` - Product form
  - File input for image upload
  - Validators (price > 0, stock >= 0)
- **File Upload**: 
  - `FormData` - Multipart form data
  - Image preview before upload
- **Routing**: 
  - `adminGuard` - Admin-only route protection

### Backend Technologies
- **Framework**: Spring Boot 3.2
- **Controller**: `ProductController`
  - `POST /api/v1/products` - Create with image
  - `PUT /api/v1/products/{id}` - Update
  - `DELETE /api/v1/products/{id}` - Delete
- **Service**: `ProductService` - CRUD operations
- **Repository**: `ProductRepository`
- **File Handling**: 
  - `FileUploadUtil` - Save images
  - Multipart file processing
- **Database**: PostgreSQL - Product CRUD
- **DTO**: 
  - `ProductRequest` - Input validation
  - Multipart form data support

### Security Features
- ✅ Admin-only access (`ADMIN` role required)
- ✅ JWT token validation
- ✅ File upload security:
  - MIME type validation (JPEG, PNG, WebP)
  - Size limit (5MB)
  - Filename sanitization (UUID generation)
  - Virus scanning (production)
- ✅ Input validation (price, stock, name, description)
- ✅ XSS prevention (HTML sanitization)
- ✅ Rate limiting (100 req/min)
- ✅ Audit logging (all changes logged)

### File Upload Flow
1. Admin selects image file
2. Client validates type and size
3. Image preview displayed
4. Form submitted as multipart/form-data
5. Backend validates MIME type
6. Generate UUID filename
7. Save to `/uploads/products/`
8. Store file path in database
9. Return product with image URL

---

## 🔒 Cross-Cutting Technologies

### Frontend (All Screens)

#### Core Framework
- **Angular 17**: 
  - Standalone Components
  - Signals (future enhancement)
  - Dependency Injection

#### Material Design
- **Angular Material 17**:
  - Consistent UI across all screens
  - Responsive design
  - Accessibility (ARIA)

#### State Management
- **RxJS**:
  - `BehaviorSubject` - Current state
  - `Observable` - Data streams
  - Operators: `tap`, `map`, `catchError`, `switchMap`

#### HTTP & Interceptors
- **HttpClient**: API communication
- **AuthInterceptor**: 
  - Automatic JWT token attachment
  - `withInterceptorsFromDi()` configuration
  - 401 error handling

#### Routing & Guards
- **Angular Router**:
  - Lazy loading components
  - Route parameters
  - Query parameters
- **Guards**:
  - `authGuard` - Authentication check
  - `adminGuard` - Admin role check
  - Redirect to login if unauthorized

#### Form Handling
- **ReactiveFormsModule**: 
  - Type-safe forms
  - Real-time validation
  - Custom validators
- **FormsModule**: 
  - Template-driven forms
  - Two-way binding

---

### Backend (All Screens)

#### Core Framework
- **Spring Boot 3.2**:
  - Auto-configuration
  - Embedded Tomcat server
  - Dependency injection

#### Security
- **Spring Security**:
  - JWT authentication
  - Role-based authorization
  - CORS configuration
  - CSRF protection
  - Security headers
- **JWT**:
  - HS512 algorithm
  - 15-min access tokens
  - 7-day refresh tokens
  - Token validation filter

#### Database
- **PostgreSQL 15**:
  - ACID transactions
  - Foreign key constraints
  - Full-text search
  - Indexing
- **Spring Data JPA**:
  - Repository pattern
  - Automatic query generation
  - Pagination support
  - Transaction management
- **Hibernate**:
  - ORM mapping
  - Entity relationships
  - Lazy loading
  - Caching

#### Validation
- **Bean Validation (JSR-380)**:
  - `@Valid` annotation
  - Constraints (@NotNull, @Email, @Min, @Max)
  - Custom validators

#### Exception Handling
- **Global Exception Handler**:
  - Centralized error responses
  - Consistent JSON format
  - HTTP status mapping
  - No stack trace exposure

#### Logging
- **SLF4J + Logback**:
  - Structured JSON logs
  - Log levels (ERROR, WARN, INFO, DEBUG)
  - Security event logging
  - Audit trail

---

## 🗄️ Database Schema

### Tables
1. **users**
   - id (BIGSERIAL PRIMARY KEY)
   - email (VARCHAR UNIQUE)
   - password_hash (VARCHAR)
   - name (VARCHAR)
   - role (VARCHAR) - CUSTOMER/ADMIN
   - created_at (TIMESTAMP)

2. **products**
   - id (BIGSERIAL PRIMARY KEY)
   - name (VARCHAR)
   - description (TEXT)
   - price (DECIMAL)
   - stock (INTEGER)
   - image_url (VARCHAR)
   - category (VARCHAR)
   - created_at (TIMESTAMP)

3. **cart_items**
   - id (BIGSERIAL PRIMARY KEY)
   - user_id (BIGINT FK → users)
   - product_id (BIGINT FK → products)
   - quantity (INTEGER)

4. **orders**
   - id (BIGSERIAL PRIMARY KEY)
   - user_id (BIGINT FK → users)
   - total (DECIMAL)
   - status (VARCHAR) - PENDING, PROCESSING, SHIPPED, DELIVERED
   - shipping_address (TEXT)
   - created_at (TIMESTAMP)

5. **order_items**
   - id (BIGSERIAL PRIMARY KEY)
   - order_id (BIGINT FK → orders)
   - product_id (BIGINT FK → products)
   - quantity (INTEGER)
   - price (DECIMAL) - Snapshot of price at order time

---

## 📦 External Services

### Image Hosting
- **Unsplash**: 
  - Free high-quality images
  - Optimized URLs (800x800px)
  - Fast CDN delivery

### Future Integrations (Planned)
- **Payment**: Stripe/PayPal
- **Email**: SendGrid/AWS SES
- **Cloud Storage**: AWS S3 (for user uploads)
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry

---

## 🔐 Security Summary by Layer

### Frontend Security
- ✅ Input validation
- ✅ XSS prevention (Angular sanitization)
- ✅ Route guards
- ✅ JWT token storage
- ✅ HTTPS (production)

### Backend Security
- ✅ Authentication (JWT)
- ✅ Authorization (role-based)
- ✅ Input validation (Bean Validation)
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS prevention (output encoding)
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Security headers
- ✅ Password hashing (BCrypt)
- ✅ Audit logging

### Database Security
- ✅ Parameterized queries only
- ✅ Foreign key constraints
- ✅ Transaction management
- ✅ Connection pooling
- ✅ SSL connections (production)

---

## 📊 Technology Stack Summary

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 17+ | SPA Framework |
| TypeScript | 5.0+ | Type-safe JavaScript |
| Angular Material | 17+ | UI Components |
| RxJS | 7.8+ | Reactive Programming |
| Vite | Latest | Build Tool |
| Node.js | 18+ | Development Environment |

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17+ | Programming Language |
| Spring Boot | 3.2+ | Application Framework |
| Spring Security | 6.0+ | Security Framework |
| Spring Data JPA | 3.2+ | Data Access |
| Hibernate | 6.0+ | ORM |
| PostgreSQL | 15+ | Database |
| Maven | 3.6+ | Build Tool |
| JWT | - | Authentication |
| BCrypt | - | Password Hashing |
| SLF4J/Logback | - | Logging |

### Development Tools
| Tool | Purpose |
|------|---------|
| Git | Version Control |
| VS Code / IntelliJ | IDE |
| Postman | API Testing |
| pgAdmin | Database Management |
| Chrome DevTools | Frontend Debugging |

---

## 🚀 Performance Optimizations

### Frontend
- ✅ Lazy loading routes
- ✅ OnPush change detection (future)
- ✅ Image optimization (800x800px)
- ✅ Pagination for large lists
- ✅ HTTP interceptors
- ✅ RxJS operators (shareReplay, debounceTime)

### Backend
- ✅ Database indexing
- ✅ JPA lazy loading
- ✅ Pagination
- ✅ Connection pooling
- ✅ Query optimization
- ✅ Caching (Redis - future)

---

**End of Tech Stack Breakdown**
