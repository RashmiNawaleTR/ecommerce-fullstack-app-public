# Secure E-Commerce Full-Stack Application

A production-ready, security-focused e-commerce platform built with Angular, Java Spring Boot, and PostgreSQL.

## Project Overview

This full-stack application demonstrates enterprise-level security practices and modern development patterns:

- **Frontend**: Angular 17 with TypeScript and Angular Material
- **Backend**: Java Spring Boot 3.2 with Spring Security
- **Database**: PostgreSQL 15+
- **Authentication**: JWT-based with refresh tokens
- **Security**: Comprehensive protection against OWASP Top 10 vulnerabilities

## Features

### Customer Features
- Browse product catalog with search and filters
- Add products to shopping cart
- Secure checkout process
- Order history and tracking
- User authentication and profile management

### Admin Features
- Product management (CRUD operations)
- Image upload with validation
- Order status management
- Inventory management

### Security Features
- JWT authentication with 15-minute access tokens
- BCrypt password hashing (strength 12)
- Role-based access control (RBAC)
- Input validation on client and server
- SQL injection prevention (parameterized queries)
- XSS protection (output encoding)
- CSRF protection
- File upload security (type/size validation)
- Rate limiting
- Comprehensive audit logging
- CORS configuration

## Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 15+
- Maven 3.6+

### 1. Database Setup

```bash
# Start PostgreSQL
brew services start postgresql@15  # macOS
# or
sudo systemctl start postgresql    # Linux

# Create database
psql postgres
CREATE DATABASE ecommerce_db;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO postgres;
\q
```

### 2. Backend Setup

```bash
cd backend

# Update application.properties with your database credentials

# Build and run
mvn clean package
mvn spring-boot:run

# Backend will start on http://localhost:8080
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Frontend will start on http://localhost:4200
```

### 4. Create Admin User

```sql
# After registering a user, make them admin:
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Project Structure

```
ecommerce-app/
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/ecommerce/
│   │   ├── config/          # Security, CORS, Web config
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── entity/          # JPA entities
│   │   ├── exception/       # Exception handling
│   │   ├── repository/      # Data access layer
│   │   ├── security/        # JWT, UserDetails, filters
│   │   ├── service/         # Business logic
│   │   └── util/            # Utility classes
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── README.md
│
├── frontend/                # Angular application
│   ├── src/app/
│   │   ├── auth/            # Authentication module
│   │   ├── product/         # Product module
│   │   ├── cart/            # Shopping cart module
│   │   ├── order/           # Order module
│   │   └── shared/          # Shared services & models
│   ├── src/environments/
│   ├── angular.json
│   ├── package.json
│   └── README.md
│
├── specs/                   # Technical design documents
│   └── ecommerce_design.md
│
└── README.md               # This file
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout

### Products (Public Read, Admin Write)
- `GET /api/v1/products` - List products (paginated, searchable)
- `GET /api/v1/products/{id}` - Get product details
- `POST /api/v1/products` - Create product (Admin)
- `PUT /api/v1/products/{id}` - Update product (Admin)
- `DELETE /api/v1/products/{id}` - Delete product (Admin)

### Cart (Authenticated)
- `GET /api/v1/cart` - Get cart
- `POST /api/v1/cart/items` - Add to cart
- `PUT /api/v1/cart/items/{productId}` - Update quantity
- `DELETE /api/v1/cart/items/{productId}` - Remove from cart
- `DELETE /api/v1/cart` - Clear cart

### Orders (Authenticated)
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - List orders
- `GET /api/v1/orders/{id}` - Get order details
- `PATCH /api/v1/orders/{id}/status` - Update status (Admin)

## Security Implementation

### Authentication & Authorization
- **JWT Tokens**: Access token (15 min), Refresh token (7 days)
- **Password Security**: BCrypt with 12 rounds
- **Role-Based Access**: CUSTOMER and ADMIN roles
- **Token Storage**: Secure storage with httpOnly cookies option

### Input Validation
- **Frontend**: Angular Reactive Forms with validators
- **Backend**: Bean Validation (JSR-380) annotations
- **Database**: Constraints (NOT NULL, UNIQUE, FK, CHECK)

### SQL Injection Prevention
- **JPA/Hibernate**: Parameterized queries only
- **No String Concatenation**: All queries use parameter binding

### XSS Prevention
- **Output Encoding**: HTML sanitization with Jsoup
- **Angular Protection**: Built-in sanitization
- **CSP Headers**: Content Security Policy

### File Upload Security
- **MIME Type Validation**: Whitelist (JPEG, PNG, WebP)
- **Size Limits**: 5MB maximum
- **Filename Sanitization**: UUID-based naming
- **Storage**: Outside webroot with controlled access

### CSRF Protection
- **SameSite Cookies**: Strict mode
- **CSRF Tokens**: On state-changing operations

### Rate Limiting
- **Authentication**: 5 attempts per 15 minutes
- **API Endpoints**: Configurable limits with Bucket4j
- **File Uploads**: 20 per hour

### Audit Logging
- **Authentication Events**: Login/logout, failures
- **Admin Actions**: Product changes, order updates
- **Security Events**: Failed auth, suspicious activity

## Development Workflow

### Adding a New Feature

1. **Design**: Update technical design document
2. **Backend**:
   - Create entity and repository
   - Create DTOs with validation
   - Implement service with business logic
   - Create controller with security annotations
   - Write unit and integration tests
3. **Frontend**:
   - Create TypeScript interfaces
   - Implement service for HTTP calls
   - Create components
   - Add route with guards
   - Write component tests
4. **Testing**: Test all security requirements
5. **Documentation**: Update README and API docs

### Running Tests

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test
```

## Production Deployment

### Backend
- Set strong `jwt.secret` (64+ random characters)
- Use environment variables for sensitive config
- Enable HTTPS
- Configure proper CORS origins
- Set up database connection pooling
- Enable production logging (JSON format)
- Configure file storage (AWS S3/Cloud Storage)
- Add malware scanning for uploads
- Set up monitoring (Prometheus/Grafana)

### Frontend
- Update `environment.prod.ts` with production API
- Build with `--configuration=production`
- Enable service worker for PWA
- Configure CDN for static assets
- Set up error tracking (Sentry)
- Enable analytics
- Configure proper CSP headers

### Database
- Use strong passwords
- Enable SSL connections
- Regular backups
- Connection pooling
- Read replicas for scaling

## Testing Credentials

After setup, create test accounts:

**Customer Account:**
- Email: customer@test.com
- Password: Test123456789!

**Admin Account:**
- Register normally, then update role in database

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database credentials
- Check port 8080 is available

### Frontend can't connect to API
- Verify backend is running on port 8080
- Check CORS configuration
- Verify API URL in environment.ts

### Authentication issues
- Clear browser localStorage
- Check JWT token expiry
- Verify credentials

## License

MIT

## Contributors

Built with the Fullstack Guardian approach - security-focused development across all layers.
