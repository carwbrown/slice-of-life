# Slice of Life

A minimalist daily activity logging app built with vanilla web technologies. No frameworks, no build tools—just HTML, HTMX, and CSS.

## Overview

**Slice of Life** is a personal journaling app for logging daily activities with a beautiful portfolio landing page and a clean, functional journaling interface.

## Tech Stack

### Frontend
- **Landing Page**: Pico CSS (semantic HTML styling)
- **App Pages**: Vanilla CSS (minimal, custom styles)
- **Interactivity**: HTMX (declarative HTTP requests)
- **Markdown Rendering**: Marked.js

### Backend
- **Database**: PocketBase (SQLite with built-in REST API)
- **Authentication**: PocketBase Auth (Email/Password + OAuth)
- **API**: PocketBase REST API (automatic from schema)
- **Admin UI**: Built-in PocketBase dashboard
- **Deployment**: Single binary file

### Hosting
- **Domain**: Namecheap (your-domain.com)
- **Backend**: VPS (Hetzner, DigitalOcean, etc.) running PocketBase
- **Frontend**: Same server or Cloudflare Pages

## Why This Stack?

### PocketBase Over Supabase
- **Single file** - One executable, no Docker, no microservices
- **Self-hosted** - Total control, zero vendor lock-in
- **Built-in Admin UI** - Manage data visually
- **Zero configuration** - Works out of the box
- **SQLite** - Fast, reliable, perfect for your use case
- **Cost** - Free (just server costs)

### HTMX Over React
- **80% less code** - Forms with 6 lines vs 40+ lines
- **No build step** - Deploy HTML files directly
- **Progressive enhancement** - Works without JavaScript
- **Server-side rendering** - Better SEO, simpler state management
- **Tiny bundle** - 14KB vs React's 40KB+

See [HTMX_VS_REACT.md](./HTMX_VS_REACT.md) for detailed comparisons.

### Pico CSS + Vanilla CSS
- **Pico CSS** for landing page - Professional look with zero effort
- **Vanilla CSS** for app - Full control, minimal bloat
- **No preprocessors** - Modern CSS has variables, nesting, calc()
- **Dark mode built-in** - Automatic via `color-scheme: light dark`

## Security Model (Important!)

### How PocketBase Authentication Works

**PocketBase does NOT use API keys like Supabase.** Instead:

1. **User Authentication Creates JWT Token**
   ```javascript
   // User logs in
   const authData = await pb.collection('users').authWithPassword(
     'user@example.com',
     'password'
   );
   // Token automatically stored in pb.authStore
   ```

2. **Token Auto-Attached to Requests**
   ```javascript
   // All subsequent requests automatically include Authorization header
   await pb.collection('entries').create({ date, content });
   // PocketBase SDK adds: Authorization: Bearer <token>
   ```

3. **Row Level Security via Collection Rules**
   ```javascript
   // In PocketBase Admin UI, set rules:
   // List/View Rule: @request.auth.id != ""
   // Create Rule: @request.auth.id = @request.data.user
   // Update Rule: @request.auth.id = user
   // Delete Rule: @request.auth.id = user
   ```

### What This Means for You

- ✅ **Frontend is safe** - No API keys to expose
- ✅ **User-specific data** - Users only see their own entries
- ✅ **Automatic security** - PocketBase SDK handles tokens
- ✅ **Tokens in localStorage** - Persist across sessions
- ✅ **No backend code needed** - Rules handle everything

### Important: PocketBase Must Be Served Over HTTPS

- Use Let's Encrypt (free SSL)
- Or put behind Cloudflare (automatic SSL)
- **Never serve over HTTP in production** (tokens would be exposed)

## Project Structure

```
slice-of-life/
├── public/                      # Frontend (deployable files)
│   ├── index.html              # Landing page (Pico CSS)
│   ├── login.html              # Login page
│   │
│   ├── app/                    # Journal application
│   │   ├── dashboard.html     # Main dashboard
│   │   ├── log.html           # Create new entry
│   │   ├── entries.html       # View all entries
│   │   └── entry.html         # Single entry view/edit
│   │
│   ├── styles/
│   │   ├── landing.css        # Landing page customizations
│   │   └── app.css            # App styles (vanilla CSS)
│   │
│   └── scripts/
│       ├── pb.js              # PocketBase client setup
│       └── auth.js            # Auth helpers
│
├── pocketbase/                  # Backend (single binary)
│   ├── pocketbase              # The executable
│   └── pb_data/                # Database & files (auto-created)
│       ├── data.db             # SQLite database
│       ├── logs.db             # Logs
│       └── storage/            # Uploaded files
│
├── docs/
│   ├── HTMX_VS_REACT.md       # HTMX vs React comparison
│   ├── DEPLOYMENT.md          # Deployment guide
│   └── POCKETBASE_SETUP.md    # PocketBase configuration
│
├── .gitignore
├── README.md
└── TODO.md                     # Step-by-step setup checklist
```

## Database Schema (PocketBase Collections)

### Users Collection (Built-in)
PocketBase creates this automatically with auth enabled.

Fields:
- `id` (auto)
- `email` (unique)
- `password` (hashed)
- `name` (optional)
- `avatar` (optional file)

### Entries Collection (Custom)

Fields:
- `id` (auto)
- `user` (relation to users)
- `date` (date)
- `content` (text)
- `created` (auto)
- `updated` (auto)

**Collection Rules:**
```javascript
// List/View Rule (who can see entries)
@request.auth.id != "" && user = @request.auth.id

// Create Rule (who can create entries)
@request.auth.id != "" && @request.data.user = @request.auth.id

// Update Rule (who can update entries)
@request.auth.id != "" && user = @request.auth.id

// Delete Rule (who can delete entries)
@request.auth.id != "" && user = @request.auth.id
```

These rules ensure:
- ✅ Users must be logged in
- ✅ Users only see their own entries
- ✅ Users can only create entries for themselves
- ✅ Users can only edit/delete their own entries

## Quick Start

### 1. Download PocketBase

```bash
# Linux/Mac
wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.4/pocketbase_0.23.4_linux_amd64.zip
unzip pocketbase_0.23.4_linux_amd64.zip

# Or download from: https://pocketbase.io/docs/
```

### 2. Start PocketBase

```bash
./pocketbase serve
```

Visit `http://127.0.0.1:8090/_/` to access admin UI.

### 3. Create Admin Account

First time you visit admin UI, create superuser account.

### 4. Create Collections

**Create "entries" collection:**
1. Click "New Collection" → "Base"
2. Name: `entries`
3. Add fields:
   - `user` (Relation, single, to "users")
   - `date` (Date, required)
   - `content` (Text, required)
4. Set API Rules (see schema above)

### 5. Enable OAuth (Optional)

1. Settings → Auth providers
2. Enable Google OAuth2
3. Add Client ID & Secret from Google Cloud Console
4. Set redirect URL: `http://localhost:8090/api/oauth2-redirect`

### 6. Create Frontend Files

See TODO.md for step-by-step instructions.

### 7. Test Locally

```bash
# Terminal 1: Run PocketBase
./pocketbase serve

# Terminal 2: Serve frontend
python3 -m http.server 8000 --directory public

# Visit http://localhost:8000
```

## PocketBase Client Setup

### `public/scripts/pb.js`
```javascript
// Initialize PocketBase client
import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.21.5/+esm';

// Point to your PocketBase instance
export const pb = new PocketBase('http://127.0.0.1:8090');

// Enable auto-cancellation (optional)
pb.autoCancellation(false);

// The authStore persists auth state in localStorage automatically
// So users stay logged in across page refreshes!
```

### `public/scripts/auth.js`
```javascript
import { pb } from './pb.js';

// Check if user is authenticated
export async function requireAuth() {
  if (!pb.authStore.isValid) {
    window.location.href = '/login.html';
    return null;
  }
  return pb.authStore.model;
}

// Sign out
export async function signOut() {
  pb.authStore.clear();
  window.location.href = '/';
}

// Get current user
export function getCurrentUser() {
  return pb.authStore.model;
}

// Check auth on page load
export async function initAuth() {
  // Try to refresh token if expired
  if (pb.authStore.isValid) {
    try {
      await pb.collection('users').authRefresh();
    } catch (err) {
      console.error('Token refresh failed:', err);
      pb.authStore.clear();
    }
  }
}
```

## Deployment Options

### Option A: Simple VPS (Recommended)

1. **Get VPS** - Hetzner ($4/month) or DigitalOcean ($6/month)
2. **Upload Files**
   ```bash
   # Upload PocketBase
   scp pocketbase root@your-server:/opt/pocketbase/
   
   # Upload frontend
   scp -r public/* root@your-server:/var/www/html/
   ```

3. **Run as Service**
   ```bash
   # Create systemd service
   sudo nano /etc/systemd/system/pocketbase.service
   ```
   
   ```ini
   [Unit]
   Description=PocketBase
   After=network.target

   [Service]
   Type=simple
   User=root
   WorkingDirectory=/opt/pocketbase
   ExecStart=/opt/pocketbase/pocketbase serve --http="0.0.0.0:8090"
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
   
   ```bash
   sudo systemctl enable pocketbase
   sudo systemctl start pocketbase
   ```

4. **Configure Nginx**
   ```nginx
   # Frontend
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;
   }
   
   # PocketBase API
   server {
       listen 80;
       server_name api.your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:8090;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. **Add SSL**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d api.your-domain.com
   ```

### Option B: Namecheap Shared Hosting + External VPS

**Frontend on Namecheap:**
- Upload `public/` files via cPanel File Manager
- Point domain to Namecheap hosting

**Backend on VPS:**
- Run PocketBase on Hetzner/DigitalOcean
- Use subdomain `api.your-domain.com`
- Configure in Namecheap DNS: `api` → `VPS_IP`

### Option C: All-in-One with Cloudflare

**Backend on VPS:**
- Run PocketBase as above

**Frontend on Cloudflare Pages:**
- Push to GitHub
- Connect Cloudflare Pages
- Auto-deploy on commit

**Benefits:**
- Free SSL/CDN
- Automatic deployments
- DDoS protection

## Environment Configuration

### For Development
```javascript
// public/scripts/pb.js
export const pb = new PocketBase('http://127.0.0.1:8090');
```

### For Production
```javascript
// public/scripts/pb.js
export const pb = new PocketBase('https://api.your-domain.com');
```

**Or use environment detection:**
```javascript
const isDev = window.location.hostname === 'localhost';
export const pb = new PocketBase(
  isDev 
    ? 'http://127.0.0.1:8090' 
    : 'https://api.your-domain.com'
);
```

## HTMX Examples with PocketBase

### Create Entry
```html
<form id="entry-form">
  <input type="date" name="date" required />
  <textarea name="content" required></textarea>
  <button type="submit">Save Entry</button>
</form>

<script type="module">
  import { pb } from './scripts/pb.js';
  
  document.getElementById('entry-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // PocketBase automatically adds auth token
    await pb.collection('entries').create({
      user: pb.authStore.model.id,
      date: formData.get('date'),
      content: formData.get('content')
    });
    
    alert('Entry saved!');
    e.target.reset();
  });
</script>
```

### Load Entries with HTMX
```html
<div id="entries-list"></div>

<script type="module">
  import { pb } from './scripts/pb.js';
  
  // Fetch entries
  const entries = await pb.collection('entries').getList(1, 20, {
    sort: '-date',
    filter: `user = "${pb.authStore.model.id}"`
  });
  
  // Render HTML
  document.getElementById('entries-list').innerHTML = entries.items
    .map(e => `
      <div class="entry">
        <h3>${e.date}</h3>
        <p>${e.content}</p>
      </div>
    `)
    .join('');
</script>
```

## Key Features

- ✅ **No API keys to manage** - Token-based auth
- ✅ **Automatic security** - Collection rules protect data
- ✅ **Single binary deployment** - No Docker complexity
- ✅ **Built-in Admin UI** - Manage data visually
- ✅ **Real-time subscriptions** - Live updates (optional)
- ✅ **File uploads** - Store avatars, attachments
- ✅ **OAuth providers** - Google, GitHub, etc.
- ✅ **Email auth** - Password resets, verification
- ✅ **Zero vendor lock-in** - Self-hosted forever

## Browser Support

All modern browsers (95%+ coverage):
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari 15+
- ✅ Mobile browsers

## Troubleshooting

### "Failed to authenticate"
- Check if token is valid: `pb.authStore.isValid`
- Try refreshing token: `pb.collection('users').authRefresh()`
- Check CORS settings in PocketBase

### "403 Forbidden"
- Check collection API rules
- Verify user is authenticated
- Check if user owns the resource

### Entries not loading
- Open browser console
- Check PocketBase is running
- Verify collection name matches
- Check filter syntax

## Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [PocketBase JavaScript SDK](https://github.com/pocketbase/js-sdk)
- [HTMX Documentation](https://htmx.org/docs/)
- [Pico CSS Docs](https://picocss.com/docs)
- [Plain Vanilla Web](https://plainvanillaweb.com/)

## Contributing

Personal project, but feel free to:
- Fork for your own use
- Submit issues
- Share improvements

## License

MIT License - Use however you want

---

## Next Steps

See [TODO.md](./TODO.md) for step-by-step setup checklist.