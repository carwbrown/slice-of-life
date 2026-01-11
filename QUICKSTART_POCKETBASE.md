# PocketBase Quick Start for "Slice of Life"

The fastest path to getting your app running.

---

## What is PocketBase?

**One file. That's it.**

- Single executable (Go binary)
- Built-in database (SQLite)
- Built-in authentication (email + OAuth)
- Built-in file storage
- Built-in Admin UI
- REST API auto-generated

**No Docker. No configuration files. No complexity.**

---

## 5-Minute Local Setup

### 1. Download PocketBase (30 seconds)

**Mac/Linux:**
```bash
wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.4/pocketbase_0.23.4_linux_amd64.zip
unzip pocketbase_0.23.4_linux_amd64.zip
chmod +x pocketbase
```

**Windows:**
- Download from [pocketbase.io](https://pocketbase.io/docs/)
- Extract `pocketbase.exe`

### 2. Start PocketBase (10 seconds)

```bash
./pocketbase serve
```

Visit: `http://127.0.0.1:8090/_/`

### 3. Create Admin Account (30 seconds)

- Email: your-email@example.com
- Password: (strong password)
- Click "Create and login"

### 4. Create "entries" Collection (2 minutes)

**Click:** Collections → New Collection → Base

**Name:** `entries`

**Add these fields:**
1. **user** (Relation)
   - Collection: `users`
   - Max select: 1
   - Required: ✅
   
2. **date** (Date)
   - Required: ✅
   
3. **content** (Plain text)
   - Required: ✅

**Click:** API Rules tab

Paste these rules:
```javascript
// List/View/Update/Delete Rule
@request.auth.id != "" && user = @request.auth.id

// Create Rule
@request.auth.id != "" && @request.data.user = @request.auth.id
```

**Click:** Save

### 5. Enable Email Auth (30 seconds)

- Collections → `users`
- Options tab
- Enable "Email/Password Auth"
- Save

### Done! ✅

Your backend is ready. PocketBase is running on `http://127.0.0.1:8090`

---

## Frontend Integration (3 lines of code)

### Install PocketBase SDK

**Via CDN (recommended):**
```javascript
import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.21.5/+esm';
```

**Via npm (if using build tools):**
```bash
npm install pocketbase
```

### Initialize Client

```javascript
// scripts/pb.js
import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.21.5/+esm';

export const pb = new PocketBase('http://127.0.0.1:8090');
```

**That's it. No API keys needed!**

---

## Basic Operations

### Register User

```javascript
await pb.collection('users').create({
  email: 'test@example.com',
  password: 'secure-password',
  passwordConfirm: 'secure-password'
});
```

### Login

```javascript
const authData = await pb.collection('users').authWithPassword(
  'test@example.com',
  'secure-password'
);

// Token automatically stored in localStorage
console.log(pb.authStore.isValid); // true
```

### Create Entry

```javascript
await pb.collection('entries').create({
  user: pb.authStore.model.id,
  date: '2026-01-04',
  content: 'My first entry!'
});
```

### Get Entries

```javascript
const entries = await pb.collection('entries').getList(1, 50, {
  sort: '-date',
  filter: `user = "${pb.authStore.model.id}"`
});

console.log(entries.items);
```

### Update Entry

```javascript
await pb.collection('entries').update('ENTRY_ID', {
  content: 'Updated content'
});
```

### Delete Entry

```javascript
await pb.collection('entries').delete('ENTRY_ID');
```

### Logout

```javascript
pb.authStore.clear();
```

---

## Complete Login Page Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>
  
  <form id="login-form">
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
  
  <div id="message"></div>
  
  <script type="module">
    import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.21.5/+esm';
    const pb = new PocketBase('http://127.0.0.1:8090');
    
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      try {
        await pb.collection('users').authWithPassword(
          formData.get('email'),
          formData.get('password')
        );
        
        document.getElementById('message').textContent = 'Logged in!';
        setTimeout(() => window.location.href = '/dashboard.html', 1000);
      } catch (err) {
        document.getElementById('message').textContent = 'Login failed: ' + err.message;
      }
    });
  </script>
</body>
</html>
```

---

## Security (Built-in!)

### What PocketBase Does Automatically

✅ **Password hashing** (bcrypt)
✅ **JWT token generation**
✅ **Token validation**
✅ **CORS handling**
✅ **Rate limiting**
✅ **SQL injection prevention**
✅ **XSS prevention** (if you sanitize HTML)

### What You Need to Do

1. **Set API rules** (we did this above)
2. **Use HTTPS in production**
3. **Sanitize user content before displaying**

That's it!

---

## OAuth (Google Login)

### 1. Get Google OAuth Credentials

- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create project
- Enable Google+ API
- Create OAuth 2.0 credentials
- Authorized redirect URI: `http://127.0.0.1:8090/api/oauth2-redirect`

### 2. Configure in PocketBase

- Settings → Auth providers → Google
- Enable
- Paste Client ID and Secret
- Save

### 3. Add to Frontend

```javascript
// Single line of code!
await pb.collection('users').authWithOAuth2({ provider: 'google' });
```

**PocketBase handles the entire OAuth flow.**

---

## Deployment Options

### Free Options (For Hobby/PoC Projects)

#### Option 1: Google Cloud Free Tier (Best Free Option)
**What you get:**
- e2-micro compute instance (0.25vCPU, 1GB RAM)
- 30GB disk storage
- 200GB network egress per month
- **100% free forever** (not a trial)

**Restrictions:**
- Must be in us-central1, us-west1, or us-east1
- Limited to free tier resources

**Setup:**
```bash
# 1. Create Google Cloud account
# 2. Enable Compute Engine API
# 3. Create VM instance (e2-micro, Ubuntu 22.04)
# 4. SSH into instance
# 5. Follow deployment steps below
```

[Sign up here](https://cloud.google.com/free)

---

#### Option 2: Oracle Cloud Always Free
**What you get:**
- Up to 4 ARM-based Ampere A1 cores
- 24GB RAM total
- 200GB block storage
- 10TB network egress per month
- **Free forever**

**Pros:** Much more powerful than Google's free tier

**Cons:** ⚠️ Unconfirmed reports of "inactive" accounts being deleted

**Setup:**
```bash
# 1. Create Oracle Cloud account
# 2. Create Always Free eligible compute instance
# 3. Choose Ubuntu 22.04 ARM
# 4. Follow deployment steps below
```

[Sign up here](https://www.oracle.com/cloud/free/)

---

#### Option 3: IBM LinuxONE (For Open Source Projects)
**What you get:**
- Free IBM Z (s390x) VMs
- For open source projects

**Requirements:**
- Must fill application form
- Project must be open source

[Apply here](https://community.ibm.com/zsystems/form/l1cc-oss-vm-request/)

---

### Paid Options (Recommended for Production)

#### Option 4: Hetzner (Best Value - $4.15/month)
**What you get:**
- CAX11: 2 vCPU, 4GB RAM, 40GB SSD
- Located in Germany or Finland
- Excellent performance per dollar

**Why we recommend:** Best price/performance ratio

[Sign up here](https://www.hetzner.com/)

---

#### Option 5: DigitalOcean ($6/month)
**What you get:**
- Basic Droplet: 1 vCPU, 1GB RAM, 25GB SSD
- Global datacenter locations

**Why we recommend:** Great documentation, easy to use

[Sign up here](https://www.digitalocean.com/)

---

#### Option 6: Vultr ($6/month)
**What you get:**
- Regular Performance: 1 vCPU, 1GB RAM, 25GB SSD
- Many datacenter locations

[Sign up here](https://www.vultr.com/)

---

#### Option 7: Linode (Akamai) ($5/month)
**What you get:**
- Nanode: 1 vCPU, 1GB RAM, 25GB SSD
- Part of Akamai (reliable infrastructure)

[Sign up here](https://www.linode.com/)

---

### Deployment Steps (All Options)

Once you have your server, follow these steps:

### 1. Upload PocketBase

```bash
scp pocketbase root@your-server:/opt/
```

### 2. Run as Service

```bash
# On server
nano /etc/systemd/system/pocketbase.service
```

```ini
[Unit]
Description=PocketBase
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt
ExecStart=/opt/pocketbase serve --http="0.0.0.0:8090"
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
systemctl enable pocketbase
systemctl start pocketbase
```

### 3. Configure Nginx + SSL

```bash
apt install nginx certbot python3-certbot-nginx
```

```nginx
server {
    listen 80;
    server_name api.your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header Host $host;
    }
}
```

```bash
certbot --nginx -d api.your-domain.com
```

### Done! Your API is live at `https://api.your-domain.com`

---

### Quick Comparison: Free vs Paid

| Provider | Cost | CPU | RAM | Storage | Best For |
|----------|------|-----|-----|---------|----------|
| **Google Cloud** | Free | 0.25 | 1GB | 30GB | Learning, hobby projects |
| **Oracle Cloud** | Free | 4 ARM | 24GB | 200GB | Serious hobby projects |
| **Hetzner CAX11** | $4.15 | 2 | 4GB | 40GB | Production (best value) |
| **DigitalOcean** | $6 | 1 | 1GB | 25GB | Production (easy setup) |
| **Vultr** | $6 | 1 | 1GB | 25GB | Production |

**Recommendation:**
- **Learning/Testing:** Google Cloud Free Tier (easiest setup)
- **Hobby Project:** Oracle Cloud Always Free (best specs)
- **Production:** Hetzner (best value for money)

---

## Common Questions

### Q: Do I need to write server-side code?
**A:** No! PocketBase generates the entire API from your collections.

### Q: Where's the API documentation?
**A:** Admin UI → Collections → Select collection → "API Preview"

### Q: How do I backup data?
**A:** Just copy the `pb_data/` folder. That's your entire database + files.

### Q: Can I use with HTMX?
**A:** Yes! See HTMX_VS_REACT.md for examples.

### Q: Can multiple users use the app?
**A:** Yes! Each user has their own account and only sees their own entries (thanks to API rules).

### Q: How do I see the database?
**A:** Use the Admin UI or any SQLite browser (it's just SQLite).

### Q: What if I need custom backend logic?
**A:** You can extend PocketBase with Go code, but for this app you won't need to.

### Q: Is it production-ready?
**A:** Yes! Many apps use PocketBase in production. It can handle thousands of requests per second on a cheap VPS.

---

## Next Steps

1. ✅ Follow TODO.md for complete setup
2. ✅ Read POCKETBASE_SECURITY.md to understand auth
3. ✅ Check HTMX_VS_REACT.md for frontend patterns
4. ✅ Deploy to your VPS

---

## Resources

- [PocketBase Docs](https://pocketbase.io/docs/)
- [JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [Discord Community](https://discord.gg/pocketbase)
- [GitHub](https://github.com/pocketbase/pocketbase)

---

## Why PocketBase for This Project?

✅ **Simple** - One file, no configuration
✅ **Fast** - SQLite is incredibly fast for small-to-medium apps
✅ **Portable** - Move servers? Just copy one file
✅ **Self-hosted** - Total control, no vendor lock-in
✅ **Zero cost** - Just server costs ($4-6/month)
✅ **Perfect for CRUD** - Auto-generated REST API
✅ **Built-in auth** - Email + OAuth out of the box
✅ **Admin UI** - Manage data without writing code

**Bottom line:** You'll spend more time building features and less time configuring infrastructure.