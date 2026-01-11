# PocketBase Security Guide

How authentication and security work in PocketBase for "Slice of Life"

---

## The Big Difference: No API Keys!

### Supabase Approach (What We're NOT Doing)
```javascript
// Supabase requires API keys exposed in frontend
const supabase = createClient(
  'https://project.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // ← Public key in code
);
```

### PocketBase Approach (What We ARE Doing)
```javascript
// PocketBase: Just the URL, no keys
const pb = new PocketBase('https://api.your-domain.com');

// Users login to get their token
await pb.collection('users').authWithPassword(email, password);
// Token stored automatically in localStorage
```

**Key insight:** PocketBase doesn't use API keys. It uses **user tokens** after authentication.

---

## How PocketBase Security Works

### 1. User Logs In → Gets JWT Token

```javascript
// User logs in
const authData = await pb.collection('users').authWithPassword(
  'user@example.com',
  'password123'
);

console.log(authData);
// {
//   record: { id: 'abc123', email: 'user@example.com', ... },
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
//   meta: { ... }
// }
```

**What happens:**
1. PocketBase verifies email/password
2. Creates a JWT (JSON Web Token) signed with a secret
3. Returns token + user data
4. SDK stores token in `pb.authStore` (localStorage)

### 2. Token Auto-Attached to All Requests

```javascript
// When you make any request...
await pb.collection('entries').create({ date, content });

// PocketBase SDK automatically adds this header:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**You don't have to do anything!** The SDK handles it.

### 3. PocketBase Validates Token + Checks Rules

```javascript
// On the server, PocketBase:
// 1. Decodes the JWT token
// 2. Verifies signature (hasn't been tampered with)
// 3. Checks if token expired
// 4. Loads the user from token
// 5. Checks collection API rules
```

Example rule:
```javascript
// Only owner can view their entries
@request.auth.id != "" && user = @request.auth.id
```

Translates to:
- ✅ User is logged in (`@request.auth.id != ""`)
- ✅ Entry belongs to them (`user = @request.auth.id`)

---

## Collection API Rules (Your Security Layer)

### Understanding the Rules Syntax

PocketBase uses a simple expression language:

```javascript
@request.auth.id      // The logged-in user's ID
@request.auth.email   // The logged-in user's email
@request.data.field   // Data being sent in request
user                  // Field in the record (e.g., user relation)
```

### Rules for "entries" Collection

#### List/Search Rule
```javascript
@request.auth.id != "" && user = @request.auth.id
```
**Meaning:** User must be logged in AND can only list entries where `user` field equals their ID.

#### View Rule
```javascript
@request.auth.id != "" && user = @request.auth.id
```
**Meaning:** User must be logged in AND can only view entries they own.

#### Create Rule
```javascript
@request.auth.id != "" && @request.data.user = @request.auth.id
```
**Meaning:** User must be logged in AND the `user` field in the data they're creating must be their own ID (prevents creating entries for other users).

#### Update Rule
```javascript
@request.auth.id != "" && user = @request.auth.id
```
**Meaning:** User must be logged in AND can only update entries they own.

#### Delete Rule
```javascript
@request.auth.id != "" && user = @request.auth.id
```
**Meaning:** User must be logged in AND can only delete entries they own.

---

## What Happens Without Rules?

```javascript
// If you set List Rule to empty string: ""
// Anyone can list ALL entries from ALL users! 🚨

// If you set Create Rule to empty string: ""
// Anyone can create entries for anyone! 🚨
```

**Always set rules!**

---

## Token Storage & Persistence

### Where Tokens Live

```javascript
// Token stored in localStorage by default
localStorage.getItem('pocketbase_auth');
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
//   "model": { "id": "abc123", "email": "user@example.com", ... }
// }
```

### Token Auto-Sync Across Tabs

PocketBase SDK automatically syncs auth state across browser tabs:

```javascript
// Tab 1: User logs in
await pb.collection('users').authWithPassword(email, pass);

// Tab 2: authStore automatically updates! 
console.log(pb.authStore.isValid); // true
```

### Checking If User Is Logged In

```javascript
// Check if token exists and is valid
if (pb.authStore.isValid) {
  console.log('User is logged in:', pb.authStore.model);
} else {
  console.log('User is logged out');
}
```

### Token Expiration & Refresh

Tokens expire after a certain time (default: 7 days).

```javascript
// Refresh token before it expires
await pb.collection('users').authRefresh();

// This gets a new token without requiring password again
```

**Auto-refresh pattern:**
```javascript
// On app load, try to refresh token
if (pb.authStore.isValid) {
  try {
    await pb.collection('users').authRefresh();
  } catch (err) {
    // Token expired or invalid, clear it
    pb.authStore.clear();
  }
}
```

---

## Common Security Patterns

### Protecting Pages (Require Login)

```javascript
// auth.js
export async function requireAuth() {
  if (!pb.authStore.isValid) {
    window.location.href = '/login.html';
    return null;
  }
  return pb.authStore.model;
}

// In your page
import { requireAuth } from './auth.js';
const user = await requireAuth(); // Redirects if not logged in
```

### Ensuring User Owns Data

```javascript
// When creating an entry
await pb.collection('entries').create({
  user: pb.authStore.model.id, // ← Force to current user
  date: formData.get('date'),
  content: formData.get('content')
});

// Even if someone tries to hack the request to set a different user ID,
// the Create Rule will reject it!
```

### Filtering User's Own Data

```javascript
// Load only current user's entries
const entries = await pb.collection('entries').getList(1, 50, {
  filter: `user = "${pb.authStore.model.id}"`
});

// Even without the filter, the List Rule would prevent
// seeing other users' entries. But explicit filter is good practice!
```

---

## OAuth Security (Google, etc.)

### How OAuth Works with PocketBase

1. User clicks "Login with Google"
2. Redirected to Google's login page
3. User approves access
4. Google redirects back to PocketBase with code
5. PocketBase exchanges code for user info
6. PocketBase creates/finds user record
7. Returns JWT token to frontend

```javascript
// Frontend just calls this:
await pb.collection('users').authWithOAuth2({ provider: 'google' });

// PocketBase handles the entire OAuth flow!
```

### OAuth Configuration

In PocketBase Admin UI → Settings → Auth providers:

```
Provider: Google
Enabled: Yes
Client ID: your-client-id.apps.googleusercontent.com
Client Secret: your-secret
Redirect URL: https://api.your-domain.com/api/oauth2-redirect
```

**Important:** The redirect URL must match exactly in Google Cloud Console!

---

## HTTPS Requirement

### Why HTTPS is Critical

```
HTTP:  Browser → [Token visible in plain text] → Server  🚨
HTTPS: Browser → [Token encrypted by TLS] → Server      ✅
```

Without HTTPS, anyone on the same network can:
- See the JWT token
- Impersonate the user
- Read/modify their data

### Getting HTTPS (Free!)

**Option 1: Let's Encrypt (VPS)**
```bash
certbot --nginx -d api.your-domain.com
```

**Option 2: Cloudflare (Free)**
- Point DNS to Cloudflare
- Enable "Full (strict)" SSL mode
- Free SSL certificate automatically

---

## CORS (Cross-Origin Requests)

### What is CORS?

Your frontend (`https://your-domain.com`) is making requests to your API (`https://api.your-domain.com`).

Browsers block this by default for security.

### How PocketBase Handles CORS

PocketBase automatically handles CORS! You just need to configure allowed origins:

**In PocketBase Admin UI → Settings → Application:**
```
Allowed origins:
https://your-domain.com
https://www.your-domain.com
http://localhost:8000 (for development)
```

**Or via environment variable:**
```bash
./pocketbase serve --origins="https://your-domain.com,http://localhost:8000"
```

---

## XSS Protection (Preventing Token Theft)

### What is XSS?

Cross-Site Scripting: Injecting malicious JavaScript to steal tokens.

### How to Protect

**1. Sanitize User Input**
```javascript
// Bad: Directly rendering user content
div.innerHTML = entry.content; // 🚨 XSS risk!

// Good: Use textContent or sanitize HTML
div.textContent = entry.content; // ✅ Safe

// Or use a library like DOMPurify for markdown
import DOMPurify from 'dompurify';
div.innerHTML = DOMPurify.sanitize(marked(entry.content)); // ✅ Safe
```

**2. Content Security Policy (CSP)**

Add to your HTML:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://cdn.jsdelivr.net; 
               style-src 'self' https://cdn.jsdelivr.net;">
```

This prevents inline scripts from running.

---

## Rate Limiting

PocketBase has built-in rate limiting to prevent abuse:

**Default limits:**
- Auth endpoints: 2 requests per 3 seconds
- Create/Update: 20 requests per 5 seconds
- General API: 300 requests per 10 seconds

Configure in Admin UI → Settings → Rate Limits.

---

## Best Practices Summary

### ✅ Do This

1. **Always set Collection API rules**
   ```javascript
   @request.auth.id != "" && user = @request.auth.id
   ```

2. **Use HTTPS in production**
   ```bash
   certbot --nginx -d api.your-domain.com
   ```

3. **Refresh tokens on app load**
   ```javascript
   if (pb.authStore.isValid) {
     await pb.collection('users').authRefresh();
   }
   ```

4. **Filter by current user**
   ```javascript
   filter: `user = "${pb.authStore.model.id}"`
   ```

5. **Sanitize user-generated content**
   ```javascript
   div.textContent = entry.content; // Safe
   ```

6. **Configure CORS properly**
   ```
   Allowed origins: https://your-domain.com
   ```

### ❌ Don't Do This

1. **Empty API rules**
   ```javascript
   "" // Anyone can access anything! 🚨
   ```

2. **HTTP in production**
   ```javascript
   const pb = new PocketBase('http://api.your-domain.com'); // 🚨
   ```

3. **Expose admin credentials**
   ```javascript
   // Never put admin password in code!
   await pb.admins.authWithPassword('admin@example.com', 'password'); // 🚨
   ```

4. **Trust client data**
   ```javascript
   // Always validate server-side via rules, not just in JavaScript
   ```

5. **Skip token refresh**
   ```javascript
   // Always check/refresh on app load
   ```

---

## Security Checklist

Before deploying to production:

- [ ] All collections have API rules set
- [ ] HTTPS enabled (Let's Encrypt or Cloudflare)
- [ ] CORS configured with allowed origins
- [ ] OAuth redirect URLs match
- [ ] User input sanitized before displaying
- [ ] Token refresh implemented on app load
- [ ] Rate limiting configured
- [ ] Admin UI accessible only via HTTPS
- [ ] Strong admin password set
- [ ] Backups configured (pb_data folder)

---

## Testing Security

### Test 1: Can't See Other Users' Data

1. Create User A, login, create entry
2. Create User B, login
3. Try to load entries → should NOT see User A's entries
4. Try to access User A's entry by ID → should fail (403)

### Test 2: Can't Create Entry for Other User

1. Login as User A
2. In browser console, try:
   ```javascript
   await pb.collection('entries').create({
     user: 'OTHER_USER_ID',
     date: '2026-01-04',
     content: 'Hacked!'
   });
   ```
3. Should fail with 403 Forbidden

### Test 3: Token Persists

1. Login
2. Close browser
3. Open browser again
4. Visit app → should still be logged in

### Test 4: Token Expires

1. In PocketBase Admin UI, set token duration to 1 minute
2. Login
3. Wait 2 minutes
4. Try to load data → should fail
5. Refresh token → should work again

---

## Troubleshooting

### "Failed to authenticate"

**Check:**
- Is token valid? `console.log(pb.authStore.isValid)`
- Is token in localStorage? `localStorage.getItem('pocketbase_auth')`
- Did token expire? Try `await pb.collection('users').authRefresh()`

### "403 Forbidden"

**Check:**
- Are API rules set correctly in Admin UI?
- Is user trying to access their own data?
- Is `user` field set correctly in request?

### "CORS error"

**Check:**
- Is origin in allowed origins list?
- Is request going to correct domain?
- Are credentials included? (SDK handles this automatically)

### Token not persisting

**Check:**
- Is localStorage enabled in browser?
- Is app served over HTTPS? (required for cookies/localStorage)
- Are third-party cookies blocked?

---

## Advanced: Superuser Tokens (Don't Use in Frontend!)

PocketBase has "superuser" tokens for server-to-server communication:

```javascript
// ⚠️ NEVER do this in frontend code!
const superuserToken = 'YOUR_GENERATED_TOKEN';
pb.authStore.save(superuserToken);

// Now you can bypass all API rules
// This is ONLY for server-side scripts!
```

**Why you don't need this:**
- Users authenticate with their own credentials
- API rules protect data automatically
- No server-side code needed for your app!

---

## Resources

- [PocketBase Authentication Docs](https://pocketbase.io/docs/authentication/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [Collection API Rules](https://pocketbase.io/docs/api-rules-and-filters/)
- [OAuth2 Setup](https://pocketbase.io/docs/authentication/#oauth2-integration)

---

**Key Takeaway:** PocketBase's security model is simpler than Supabase because there are no API keys to manage. Users authenticate, get a token, and API rules enforce who can access what. Set your rules correctly and everything else is handled automatically!