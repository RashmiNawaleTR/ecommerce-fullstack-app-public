# E-Commerce Backend

Secure e-commerce backend built with Spring Boot, PostgreSQL, and JWT authentication.

## Features

- **Authentication**: JWT-based authentication with refresh tokens
- **Product Management**: CRUD operations with image upload (Admin only)
- **Shopping Cart**: Real-time cart management
- **Order Processing**: Transactional order creation with inventory management
- **File Upload**: Secure image upload with validation
- **Security**: BCrypt password hashing, role-based access control, input validation
- **Error Handling**: Global exception handler with consistent error responses

## Tech Stack

- Java 17+
- Spring Boot 3.2.4
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (jsonwebtoken 0.12.5)
- Lombok
- Maven

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 15+

## Setup Instructions

### 1. Install PostgreSQL

```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
psql postgres
CREATE DATABASE ecommerce_db;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO postgres;
\q
```

### 3. Configure Application

Update `src/main/resources/application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=your_password

# IMPORTANT: Change JWT secret in production
jwt.secret=your-very-long-secret-key-here
```

### 4. Build and Run

```bash
# Clean and build
mvn clean package

# Run application
mvn spring-boot:run

# Or run the JAR
java -jar target/ecommerce-backend-1.0.0.jar
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout

### Products (Public Read, Admin Write)
- `GET /api/v1/products` - List products (paginated)
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
- `PATCH /api/v1/orders/{id}/status` - Update order status (Admin)

## Security Features

### Authentication & Authorization
- JWT tokens with 15-minute expiry
- Refresh tokens with 7-day expiry
- Role-based access control (CUSTOMER, ADMIN)
- BCrypt password hashing (strength 12)

### Input Validation
- Bean Validation (JSR-380) on all DTOs
- HTML sanitization with Jsoup
- File upload validation (type, size, extension)

### File Upload Security
- Whitelist MIME types: image/jpeg, image/png, image/webp
- Max file size: 5MB
- Sanitized filenames with UUID
- Files stored outside webroot

### API Security
- CORS configuration
- CSRF protection
- Rate limiting (Bucket4j)
- Comprehensive audit logging

## Creating Admin User

After starting the application, register normally and manually update the user role in the database:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

Or add a data initialization script in `src/main/resources/data.sql`

## Testing

```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=AuthServiceTest
```

## Production Checklist

- [ ] Change `jwt.secret` to a strong random key
- [ ] Update database credentials
- [ ] Configure CORS for your frontend domain
- [ ] Enable HTTPS
- [ ] Set up proper logging (ELK stack)
- [ ] Add rate limiting
- [ ] Configure file storage (AWS S3)
- [ ] Add malware scanning for uploads
- [ ] Set up database backups
- [ ] Configure monitoring (Prometheus/Grafana)

## Project Structure

```
src/main/java/com/ecommerce/
├── config/           # Security, CORS, Web configuration
├── controller/       # REST controllers
├── dto/              # Data Transfer Objects
├── entity/           # JPA entities
├── exception/        # Custom exceptions and global handler
├── repository/       # Spring Data JPA repositories
├── security/         # JWT utilities, UserDetails, filters
├── service/          # Business logic
└── util/             # File upload utilities
```

## License

MIT
