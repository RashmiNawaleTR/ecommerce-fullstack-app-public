# 🚀 Quick Start Guide

Your e-commerce application is ready to run!

## ✅ What's Already Done

- ✅ Database `ecommerce_db` created
- ✅ 5 tables created with proper relationships
- ✅ 2 test users added (1 customer, 1 admin)
- ✅ 5 sample products added across different categories
- ✅ Backend code complete (Spring Boot)
- ✅ Frontend code complete (Angular)

## 📊 Current Database Status

### Users
- **customer@test.com** (CUSTOMER role)
- **admin@test.com** (ADMIN role)
- Password for both: `Test123456789!`

### Products (5 entries)
1. Wireless Bluetooth Headphones - $89.99 (Electronics)
2. Organic Cotton T-Shirt - $24.99 (Clothing)
3. Stainless Steel Water Bottle - $34.99 (Home & Kitchen)
4. Laptop Backpack - $49.99 (Accessories)
5. Yoga Mat with Carrying Strap - $29.99 (Sports & Fitness)

## 🏃 Start the Application

### Terminal 1: Start Backend

```bash
cd /Users/rashminawale/ecommerce-app/backend

# First time: Install dependencies
mvn clean install

# Start the server
mvn spring-boot:run
```

**Expected output:**
- Server starts on `http://localhost:8080`
- Spring Boot banner appears
- "Started EcommerceApplication in X seconds"

### Terminal 2: Start Frontend

```bash
cd /Users/rashminawale/ecommerce-app/frontend

# First time: Install dependencies
npm install

# Start the development server
npm start
```

**Expected output:**
- Angular compiles successfully
- Server starts on `http://localhost:4200`
- Browser opens automatically

## 🧪 Test the Application

### 1. Test as Customer

1. Open browser: `http://localhost:4200`
2. Click **Login**
3. Enter credentials:
   - Email: `customer@test.com`
   - Password: `Test123456789!`
4. Browse products
5. Add items to cart
6. Proceed to checkout
7. View order history

### 2. Test as Admin

1. Click **Logout** (if logged in)
2. **Login** with admin credentials:
   - Email: `admin@test.com`
   - Password: `Test123456789!`
3. Notice "Manage Products" option in menu
4. Click user menu → **Manage Products**
5. Create, edit, or delete products
6. Upload product images (max 5MB)

### 3. Test API Directly

```bash
# Health check
curl http://localhost:8080/api/v1/products

# Login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","password":"Test123456789!"}'
```

## 📁 Project Structure

```
ecommerce-app/
├── backend/              # Spring Boot (Port 8080)
│   ├── src/main/java/
│   └── pom.xml
├── frontend/             # Angular (Port 4200)
│   ├── src/app/
│   └── package.json
├── specs/               # Technical documentation
├── DATABASE.md          # Database guide
├── QUICK_START.md       # This file
└── README.md           # Main documentation
```

## 🔧 Common Tasks

### View Database
```bash
psql -d ecommerce_db
\dt                    # List tables
SELECT * FROM users;   # View users
SELECT * FROM products; # View products
```

### Make Yourself Admin
```sql
psql -d ecommerce_db -c "UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';"
```

### Reset Database
```bash
./setup-database.sh
```

### View Backend Logs
Backend logs appear in the terminal where you run `mvn spring-boot:run`

### View Frontend Logs
- Browser console (F12)
- Terminal where you run `npm start`

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 8080 is in use
lsof -i :8080

# Check PostgreSQL is running
pg_isready

# Start PostgreSQL if needed
brew services start postgresql@15
```

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check if port 4200 is in use
lsof -i :4200
```

### Can't connect to API
- Verify backend is running on port 8080
- Check `frontend/src/environments/environment.ts`
- Check browser console for CORS errors
- Verify `backend/src/main/resources/application.properties` CORS settings

### Login fails
- Verify user exists: `psql -d ecommerce_db -c "SELECT * FROM users;"`
- Check password: `Test123456789!`
- Check backend logs for authentication errors

## 🎯 Next Steps

1. **Customize Products**: Add your own products via admin panel
2. **Upload Images**: Add product images (JPEG, PNG, WebP)
3. **Test Checkout**: Place test orders
4. **Explore API**: Check `http://localhost:8080/api/v1` endpoints
5. **Read Documentation**: See README.md for full details

## 📞 Support

- Full documentation: See `README.md`
- Database guide: See `DATABASE.md`
- Technical design: See `specs/ecommerce_design.md`
- Backend docs: See `backend/README.md`
- Frontend docs: See `frontend/README.md`

---

**Ready to go!** 🎉

Start both servers and visit `http://localhost:4200`
