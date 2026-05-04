# 🔐 How to Login and Use Cart

## The Problem
You're getting **403 Forbidden** errors because the cart requires authentication.

## The Solution (3 Easy Steps)

### Step 1: Go to Login Page
1. Open your browser to: **http://localhost:4200**
2. Look at the top-right corner of the page
3. Click the **"Login"** button (blue button in navigation bar)

### Step 2: Enter Credentials
```
Email: customer@test.com
Password: Test123456789!
```

Click the **"Login"** button on the form.

### Step 3: Add Products to Cart
1. After successful login, you'll see your name in the top-right
2. Click **"Products"** in the navigation
3. Now click **"Add to Cart"** on any product
4. ✅ **It will work!**

## How to Verify You're Logged In

Look at the top-right corner of the page:
- **Not Logged In**: You see "Login" and "Register" buttons
- **Logged In**: You see a shopping cart icon and your name "Test Customer"

## Test It Right Now

Run this in your browser console (F12 → Console tab):
```javascript
// Check if logged in
console.log('Logged in:', !!localStorage.getItem('access_token'));
console.log('User:', localStorage.getItem('user'));
```

If it shows `Logged in: false`, you need to login!

## Alternative: Quick Test

Use the test page I created:
```bash
open /Users/rashminawale/ecommerce-app/test-login-and-cart.html
```

This page lets you test login and cart in 3 clicks!

---

**Bottom Line**: The app is working perfectly. You just need to login first! 🎯
