# Database Setup Guide

## Database Information

- **Database Name**: `ecommerce_db`
- **RDBMS**: PostgreSQL 15+
- **Connection**: `jdbc:postgresql://localhost:5432/ecommerce_db`

## Setup Status

✅ **Database Created**: `ecommerce_db`
✅ **Schema Created**: All 5 tables with indexes
✅ **Sample Data Inserted**: 2 users + 5 products

## Database Schema

### Tables

1. **users** - User accounts (customers and admins)
2. **products** - Product catalog
3. **cart_items** - Shopping cart items
4. **orders** - Customer orders
5. **order_items** - Order line items

### Relationships

```
users (1) ──→ (N) cart_items
users (1) ──→ (N) orders
products (1) ──→ (N) cart_items
products (1) ──→ (N) order_items
orders (1) ──→ (N) order_items
```

## Sample Data

### Users (2 entries)

| ID | Email | Name | Role | Password |
|----|-------|------|------|----------|
| 1 | customer@test.com | Test Customer | CUSTOMER | Test123456789! |
| 2 | admin@test.com | Admin User | ADMIN | Test123456789! |

**Note**: Passwords are BCrypt hashed with strength 12

### Products (5 entries)

| ID | Name | Price | Stock | Category |
|----|------|-------|-------|----------|
| 1 | Wireless Bluetooth Headphones | $89.99 | 45 | Electronics |
| 2 | Organic Cotton T-Shirt | $24.99 | 120 | Clothing |
| 3 | Stainless Steel Water Bottle | $34.99 | 78 | Home & Kitchen |
| 4 | Laptop Backpack | $49.99 | 32 | Accessories |
| 5 | Yoga Mat with Carrying Strap | $29.99 | 95 | Sports & Fitness |

## Quick Commands

### Connect to Database
```bash
psql -d ecommerce_db
```

### View All Tables
```sql
\dt
```

### View Users
```sql
SELECT id, email, name, role FROM users;
```

### View Products
```sql
SELECT id, name, price, stock, category FROM products;
```

### Count Records
```sql
SELECT 
    (SELECT COUNT(*) FROM users) as users,
    (SELECT COUNT(*) FROM products) as products,
    (SELECT COUNT(*) FROM orders) as orders,
    (SELECT COUNT(*) FROM cart_items) as cart_items;
```

### Make User Admin
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Reset Database

If you need to start fresh:

```bash
# Using the setup script
./setup-database.sh

# Or manually
psql postgres -c "DROP DATABASE IF EXISTS ecommerce_db;"
psql postgres -c "CREATE DATABASE ecommerce_db;"
psql -d ecommerce_db -f backend/src/main/resources/schema.sql
psql -d ecommerce_db -f backend/src/main/resources/init-data.sql
```

## Backup & Restore

### Backup
```bash
pg_dump ecommerce_db > backup.sql
```

### Restore
```bash
psql -d ecommerce_db < backup.sql
```

## Connection Test

Test PostgreSQL connection:
```bash
pg_isready
psql -d ecommerce_db -c "SELECT version();"
```

## Security Notes

- Default credentials are for **development only**
- Change passwords in production
- Use environment variables for sensitive data
- Enable SSL for production database connections
- Implement regular backup strategy

## Troubleshooting

### Cannot connect to database
```bash
# Check if PostgreSQL is running
brew services list  # macOS
sudo systemctl status postgresql  # Linux

# Start PostgreSQL
brew services start postgresql@15  # macOS
sudo systemctl start postgresql  # Linux
```

### Permission denied
```bash
# Grant privileges
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO your_user;"
```

### Database already exists
```bash
# Drop and recreate
psql postgres -c "DROP DATABASE ecommerce_db;"
psql postgres -c "CREATE DATABASE ecommerce_db;"
```

## Production Considerations

- [ ] Use strong passwords
- [ ] Enable connection pooling
- [ ] Set up read replicas
- [ ] Enable automated backups
- [ ] Monitor database performance
- [ ] Set up proper indexes
- [ ] Configure connection limits
- [ ] Enable SSL/TLS
- [ ] Implement audit logging
- [ ] Regular security updates
