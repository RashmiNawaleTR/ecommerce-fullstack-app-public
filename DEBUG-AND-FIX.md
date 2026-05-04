# 🔍 DEBUG AND FIX - Cart 403 Error

## I've Added Debug Logging

The app now shows detailed console logs to see exactly what's happening.

## What to Do Now:

### Step 1: Open Browser Console
1. Go to http://localhost:4200
2. Press **F12** or **Cmd+Option+I** (Mac)
3. Click on the **Console** tab

### Step 2: Watch the Logs

You should see:
```
🔐 Auto-login: Logging in...
✅ Login successful, storing token: eyJhbGciOiJIUzUxMiJ9...
💾 Token stored in localStorage as: access_token
🔍 Verify token: eyJhbGciOiJIUzUxMiJ9...
✅ Auto-login: Success!
```

### Step 3: Try Adding to Cart

Click "Add to Cart" on any product.

Watch the console - you should see:
```
🔍 HTTP Interceptor: {url: "...", hasToken: true, token: "eyJh..."}
✅ Token added to request: http://localhost:8080/api/v1/cart/items
```

## If You Still See 403:

### Check Token in Console:
```javascript
console.log('Token:', localStorage.getItem('access_token'));
```

### Manual Fix (Paste in Console):
```javascript
// Clear and re-login
localStorage.clear();
fetch('http://localhost:8080/api/v1/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email:'customer@test.com',password:'Test123456789!'})
})
.then(r => r.json())
.then(d => {
  localStorage.setItem('access_token', d.accessToken);
  localStorage.setItem('refresh_token', d.refreshToken);
  localStorage.setItem('user', JSON.stringify(d.user));
  console.log('✅ Fixed! Token:', d.accessToken.substring(0, 30));
  location.reload();
});
```

## Common Issues:

| Issue | Solution |
|-------|----------|
| Token is `null` | Auto-login failed - use manual fix above |
| Token exists but 403 | Token might be expired - clear and re-login |
| Interceptor not adding token | Check console for "⚠️ No token available" |
| Backend rejecting token | Check if backend is running on port 8080 |

## Test Backend Directly:

```bash
# Test login
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","password":"Test123456789!"}'

# Should return: {"user":{...},"accessToken":"...","refreshToken":"..."}
```

## The Logs Will Tell Us Exactly What's Wrong!

Look at the console and send me what you see.
