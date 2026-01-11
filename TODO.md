# Slice of Life - Setup Checklist with PocketBase

Complete step-by-step guide to get your app deployed.

---

## Phase 1: PocketBase Setup (20 minutes)

### 1.1 Download PocketBase
- [ ] Go to [https://pocketbase.io/docs/](https://pocketbase.io/docs/)
- [ ] Download for your OS (Linux, Mac, or Windows)
- [ ] Extract the zip file
- [ ] You should have a single `pocketbase` executable

### 1.2 Start PocketBase Locally
```bash
# Mac/Linux
./pocketbase serve

# Windows
pocketbase.exe serve
```

- [ ] Run the command above
- [ ] Visit `http://127.0.0.1:8090/_/`
- [ ] Should see PocketBase admin UI

### 1.3 Create Admin Account
- [ ] Click "Create admin account"
- [ ] Email: your-email@example.com
- [ ] Password: (strong password)
- [ ] Save credentials securely
- [ ] Click "Create and login"

### 1.4 Create "entries" Collection
- [ ] Click "Collections" in sidebar
- [ ] Click "New Collection" → "Base collection"
- [ ] Name: `entries`
- [ ] Click "Create"

### 1.5 Add Fields to Entries Collection
- [ ] Click on `entries` collection
- [ ] Click "Add Field"

**Field 1: user (Relation)**
- [ ] Type: Relation
- [ ] Name: `user`
- [ ] Collection: `users`
- [ ] Max select: 1 (single)
- [ ] Required: Yes
- [ ] Click "Save"

**Field 2: date**
- [ ] Type: Date
- [ ] Name: `date`
- [ ] Required: Yes
- [ ] Click "Save"

**Field 3: content**
- [ ] Type: Plain text
- [ ] Name: `content`
- [ ] Required: Yes
- [ ] Click "Save"

### 1.6 Set API Rules for Entries
- [ ] Click on `entries` collection
- [ ] Click "API Rules" tab

**List/Search Rule:**
```javascript
@request.auth.id != "" && user = @request.auth.id
```
- [ ] Paste above in "List/Search rule"

**View Rule:**
```javascript
@request.auth.id != "" && user = @request.auth.id
```
- [ ] Paste above in "View rule"

**Create Rule:**
```javascript
@request.auth.id != "" && @request.data.user = @request.auth.id
```
- [ ] Paste above in "Create rule"

**Update Rule:**
```javascript
@request.auth.id != "" && user = @request.auth.id
```
- [ ] Paste above in "Update rule"

**Delete Rule:**
```javascript
@request.auth.id != "" && user = @request.auth.id
```
- [ ] Paste above in "Delete rule"

- [ ] Click "Save" at bottom

### 1.7 Configure Users Collection
- [ ] Click "Collections" → `users`
- [ ] Click "Options" tab
- [ ] Enable "Email/Password Auth"
- [ ] Email verification: Optional (your choice)
- [ ] Click "Save"

### 1.8 Configure OAuth (Optional - Google)
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create new project or select existing
- [ ] Enable "Google+ API"
- [ ] Credentials → Create Credentials → OAuth 2.0 Client ID
- [ ] Application type: Web application
- [ ] Name: "Slice of Life"
- [ ] Authorized redirect URIs:
  - `http://127.0.0.1:8090/api/oauth2-redirect`
  - `https://api.your-domain.com/api/oauth2-redirect` (for production)
- [ ] Copy Client ID and Client Secret
- [ ] In PocketBase: Settings → Auth providers → Google
- [ ] Enable Google OAuth2
- [ ] Paste Client ID and Client Secret
- [ ] Click "Save"

### 1.9 Test PocketBase
- [ ] Go to Collections → `users`
- [ ] Click "API Preview"
- [ ] Try "Create" example in browser console
- [ ] Verify user is created
- [ ] Try logging in via Auth methods

---

## Phase 2: Project Structure (10 minutes)

### 2.1 Create Folder Structure
```bash
mkdir -p slice-of-life/public/{app,styles,scripts}
cd slice-of-life
```

- [ ] Create `public/` folder
- [ ] Create `public/app/` folder
- [ ] Create `public/styles/` folder
- [ ] Create `public/scripts/` folder

### 2.2 Initialize Git
```bash
git init
```

Create `.gitignore`:
```
pb_data/
node_modules/
.DS_Store
.env
```

- [ ] Run `git init`
- [ ] Create `.gitignore` file
- [ ] Add above content
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`

### 2.3 Move PocketBase
```bash
# Copy pocketbase executable to project root
cp /path/to/pocketbase ./pocketbase
```

- [ ] Copy pocketbase executable to project folder
- [ ] Test: `./pocketbase serve`
- [ ] Verify at `http://127.0.0.1:8090/_/`

---

## Phase 3: Frontend - Landing Page (1 hour)

### 3.1 Create `public/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name - Software Engineer</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <link rel="stylesheet" href="styles/landing.css">
</head>
<body>
  <main class="container">
    <hgroup>
      <h1>Your Name</h1>
      <p>Software Engineer & Maker</p>
    </hgroup>
    
    <section>
      <h2>About</h2>
      <p>I build simple, maintainable web applications with vanilla technologies.</p>
    </section>
    
    <section>
      <h2>Featured Project</h2>
      <article>
        <header><h3>Slice of Life</h3></header>
        <p>A minimalist daily journaling app built with HTML, HTMX, and PocketBase.</p>
        <footer>
          <a href="/login.html" role="button">Try the App</a>
          <a href="https://github.com/yourusername/slice-of-life" role="button" class="secondary">View Code</a>
        </footer>
      </article>
    </section>
  </main>
</body>
</html>
```

- [ ] Create file
- [ ] Replace "Your Name"
- [ ] Update GitHub link

### 3.2 Create `public/styles/landing.css`
```css
:root {
  --font-size: 1.25rem;
}

hgroup {
  text-align: center;
  margin-bottom: 3rem;
}

hgroup h1 {
  font-size: 3rem;
}
```

- [ ] Create file
- [ ] Test styling

---

## Phase 4: Frontend - Authentication (45 minutes)

### 4.1 Create `public/scripts/pb.js`
```javascript
import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.21.5/+esm';

// For development
const isDev = window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';

export const pb = new PocketBase(
  isDev 
    ? 'http://127.0.0.1:8090' 
    : 'https://api.your-domain.com' // Change in production
);

// Disable auto-cancellation
pb.autoCancellation(false);
```

- [ ] Create file
- [ ] Verify PocketBase URL

### 4.2 Create `public/scripts/auth.js`
```javascript
import { pb } from './pb.js';

export async function requireAuth() {
  if (!pb.authStore.isValid) {
    window.location.href = '/login.html';
    return null;
  }
  return pb.authStore.model;
}

export async function signOut() {
  pb.authStore.clear();
  window.location.href = '/';
}

export function getCurrentUser() {
  return pb.authStore.model;
}

export async function initAuth() {
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

- [ ] Create file

### 4.3 Create `public/login.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Slice of Life</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
  <link rel="stylesheet" href="styles/landing.css">
</head>
<body>
  <main class="container">
    <article style="max-width: 500px; margin: 4rem auto;">
      <header>
        <h1>Slice of Life</h1>
        <p>Log in to start journaling</p>
      </header>
      
      <!-- Email/Password Login -->
      <form id="login-form">
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      
      <p style="text-align: center; margin: 1rem 0;">or</p>
      
      <!-- OAuth Login -->
      <button id="google-login" class="contrast">
        Continue with Google
      </button>
      
      <footer>
        <small><a href="/">← Back to home</a></small>
      </footer>
    </article>
  </main>
  
  <script type="module">
    import { pb } from './scripts/pb.js';
    
    // Email/Password login
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      try {
        await pb.collection('users').authWithPassword(
          formData.get('email'),
          formData.get('password')
        );
        window.location.href = '/app/dashboard.html';
      } catch (err) {
        alert('Login failed: ' + err.message);
      }
    });
    
    // Google OAuth login
    document.getElementById('google-login').addEventListener('click', async () => {
      try {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
        window.location.href = '/app/dashboard.html';
      } catch (err) {
        alert('OAuth failed: ' + err.message);
      }
    });
  </script>
</body>
</html>
```

- [ ] Create file
- [ ] Test email/password login
- [ ] Test OAuth login (if configured)

---

## Phase 5: Frontend - App Pages (2 hours)

### 5.1 Create `public/styles/app.css`
```css
html {
  color-scheme: light dark;
}

body {
  font-family: system-ui, sans-serif;
  font-size: 1.25rem;
  line-height: 1.5;
  max-width: 70ch;
  margin: 0 auto;
  padding: 1rem;
}

:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-border: #e0e0e0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1a1a1a;
    --color-text: #e0e0e0;
    --color-border: #444;
  }
}

form {
  display: grid;
  gap: 1rem;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font: inherit;
  background: var(--color-bg);
  color: var(--color-text);
}

textarea {
  min-height: 200px;
  resize: vertical;
}

button {
  padding: 0.5rem 1.5rem;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.entry {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

nav a {
  text-decoration: none;
  color: var(--color-text);
}

nav a:hover {
  text-decoration: underline;
}
```

- [ ] Create file

### 5.2 Create `public/app/dashboard.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - Slice of Life</title>
  <link rel="stylesheet" href="../styles/app.css">
</head>
<body>
  <nav>
    <a href="/app/dashboard.html">Dashboard</a>
    <a href="/app/log.html">New Entry</a>
    <a href="/app/entries.html">All Entries</a>
    <button id="sign-out">Sign Out</button>
  </nav>
  
  <main>
    <h1>Welcome back, <span id="user-name"></span>!</h1>
    
    <section>
      <h2>Recent Entries</h2>
      <div id="recent-entries">Loading...</div>
    </section>
  </main>
  
  <script type="module">
    import { pb } from '../scripts/pb.js';
    import { requireAuth, signOut } from '../scripts/auth.js';
    
    // Check auth
    const user = await requireAuth();
    document.getElementById('user-name').textContent = user.email;
    
    // Sign out
    document.getElementById('sign-out').addEventListener('click', signOut);
    
    // Load recent entries
    const entries = await pb.collection('entries').getList(1, 5, {
      sort: '-date',
      filter: `user = "${user.id}"`
    });
    
    document.getElementById('recent-entries').innerHTML = entries.items
      .map(e => `
        <div class="entry">
          <h3>${e.date}</h3>
          <p>${e.content.substring(0, 100)}...</p>
        </div>
      `)
      .join('') || '<p>No entries yet. <a href="/app/log.html">Create your first entry!</a></p>';
  </script>
</body>
</html>
```

- [ ] Create file
- [ ] Test dashboard loads
- [ ] Test sign out

### 5.3 Create `public/app/log.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Entry - Slice of Life</title>
  <link rel="stylesheet" href="../styles/app.css">
</head>
<body>
  <nav>
    <a href="/app/dashboard.html">Dashboard</a>
    <a href="/app/log.html">New Entry</a>
    <a href="/app/entries.html">All Entries</a>
    <button id="sign-out">Sign Out</button>
  </nav>
  
  <main>
    <h1>New Entry</h1>
    
    <form id="entry-form">
      <label for="date">Date</label>
      <input type="date" id="date" name="date" required />
      
      <label for="content">Content (Markdown supported)</label>
      <textarea id="content" name="content" required placeholder="Write your entry here..."></textarea>
      
      <button type="submit">Save Entry</button>
    </form>
    
    <div id="result"></div>
  </main>
  
  <script type="module">
    import { pb } from '../scripts/pb.js';
    import { requireAuth, signOut } from '../scripts/auth.js';
    
    const user = await requireAuth();
    document.getElementById('sign-out').addEventListener('click', signOut);
    
    // Set today's date
    document.getElementById('date').valueAsDate = new Date();
    
    // Handle form submission
    document.getElementById('entry-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      try {
        await pb.collection('entries').create({
          user: user.id,
          date: formData.get('date'),
          content: formData.get('content')
        });
        
        document.getElementById('result').innerHTML = 
          '<p style="color: green;">Entry saved! <a href="/app/entries.html">View all entries</a></p>';
        e.target.reset();
        document.getElementById('date').valueAsDate = new Date();
      } catch (err) {
        document.getElementById('result').innerHTML = 
          '<p style="color: red;">Failed to save: ' + err.message + '</p>';
      }
    });
  </script>
</body>
</html>
```

- [ ] Create file
- [ ] Test creating an entry
- [ ] Verify entry appears in dashboard

### 5.4 Create `public/app/entries.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Entries - Slice of Life</title>
  <link rel="stylesheet" href="../styles/app.css">
</head>
<body>
  <nav>
    <a href="/app/dashboard.html">Dashboard</a>
    <a href="/app/log.html">New Entry</a>
    <a href="/app/entries.html">All Entries</a>
    <button id="sign-out">Sign Out</button>
  </nav>
  
  <main>
    <h1>All Entries</h1>
    
    <div id="entries-list">Loading...</div>
  </main>
  
  <script type="module">
    import { pb } from '../scripts/pb.js';
    import { requireAuth, signOut } from '../scripts/auth.js';
    
    const user = await requireAuth();
    document.getElementById('sign-out').addEventListener('click', signOut);
    
    // Load all entries
    const entries = await pb.collection('entries').getList(1, 50, {
      sort: '-date',
      filter: `user = "${user.id}"`
    });
    
    document.getElementById('entries-list').innerHTML = entries.items
      .map(e => `
        <div class="entry">
          <h3>${e.date}</h3>
          <p>${e.content}</p>
        </div>
      `)
      .join('') || '<p>No entries yet.</p>';
  </script>
</body>
</html>
```

- [ ] Create file
- [ ] Test loading all entries
- [ ] Verify only your entries show

---

## Phase 6: Local Testing (30 minutes)

### 6.1 Test Full Flow
- [ ] Start PocketBase: `./pocketbase serve`
- [ ] Start local server: `python3 -m http.server 8000 --directory public`
- [ ] Visit `http://localhost:8000`
- [ ] Landing page loads
- [ ] Click "Try the App"
- [ ] Login page loads
- [ ] Login with email/password OR Google
- [ ] Dashboard loads with user name
- [ ] Create new entry
- [ ] Entry saves successfully
- [ ] View all entries
- [ ] Entries display correctly
- [ ] Sign out works
- [ ] Redirects to home

### 6.2 Test Responsive Design
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar
- [ ] Test mobile view
- [ ] Test tablet view
- [ ] Test desktop view

### 6.3 Test Dark Mode
- [ ] Change OS to dark mode
- [ ] Refresh pages
- [ ] Verify dark colors
- [ ] Check readability

---

## Phase 7: Server Setup (45 minutes)

### Option A: Google Cloud Free Tier (Recommended for Beginners)

#### 7.1 Create Google Cloud Account
- [ ] Go to [https://cloud.google.com/free](https://cloud.google.com/free)
- [ ] Click "Get started for free"
- [ ] Sign in with Google account
- [ ] Enter billing information (won't be charged)
- [ ] Verify identity
- [ ] Accept terms

#### 7.2 Create VM Instance
- [ ] Go to Console: [https://console.cloud.google.com](https://console.cloud.google.com)
- [ ] Click hamburger menu → "Compute Engine" → "VM instances"
- [ ] Click "Enable" if Compute Engine API isn't enabled (takes 1-2 minutes)
- [ ] Click "Create Instance"

**Instance Configuration:**
- [ ] Name: `pocketbase-server`
- [ ] Region: **us-central1** (Iowa) or **us-west1** (Oregon) or **us-east1** (South Carolina)
  - ⚠️ **MUST be one of these for free tier!**
- [ ] Zone: Any (e.g., us-central1-a)
- [ ] Machine configuration:
  - Series: **E2**
  - Machine type: **e2-micro** (2 vCPU, 1 GB memory) ← This is the free tier
- [ ] Boot disk: Click "Change"
  - Operating system: **Ubuntu**
  - Version: **Ubuntu 22.04 LTS**
  - Boot disk type: **Standard persistent disk**
  - Size: **30 GB** (max for free tier)
  - Click "Select"
- [ ] Firewall:
  - ✅ Allow HTTP traffic
  - ✅ Allow HTTPS traffic
- [ ] Click "Create"
- [ ] Wait 30-60 seconds for VM to start

#### 7.3 Note Your Server IP
- [ ] VM instances page should show your server
- [ ] Look for "External IP" column
- [ ] Copy the IP address (e.g., 34.123.45.67)
- [ ] Save this IP address - you'll need it!

#### 7.4 Connect via SSH (Browser)
- [ ] Click "SSH" button next to your instance
- [ ] Browser window opens with terminal
- [ ] You're now connected to your server!

**Alternative: SSH from your computer**
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t rsa -b 4096

# Copy your public key
cat ~/.ssh/id_rsa.pub

# In Google Cloud Console:
# 1. Click VM instance name
# 2. Click "Edit"
# 3. Scroll to "SSH Keys"
# 4. Click "Add item"
# 5. Paste your public key
# 6. Click "Save"

# Now connect from your terminal
ssh YOUR_USERNAME@YOUR_EXTERNAL_IP
```

#### 7.5 Initial Server Setup
```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Update system
apt update && apt upgrade -y

# Install nginx
apt install nginx -y

# Install certbot for SSL
apt install certbot python3-certbot-nginx -y
```

- [ ] SSH into server
- [ ] Run commands above
- [ ] Verify nginx: visit `http://YOUR_SERVER_IP`

#### 7.5 Initial Server Setup
```bash
# You should now be in the server terminal
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install nginx (web server)
sudo apt install nginx -y

# Install certbot (for SSL certificates)
sudo apt install certbot python3-certbot-nginx -y

# Install unzip (to extract PocketBase)
sudo apt install unzip -y

# Check nginx is running
sudo systemctl status nginx
# Press 'q' to exit
```

- [ ] Run all commands above
- [ ] Verify nginx status shows "active (running)"
- [ ] Visit `http://YOUR_EXTERNAL_IP` in browser
- [ ] Should see "Welcome to nginx!" page

#### 7.6 Download & Setup PocketBase
```bash
# Create directory for PocketBase
sudo mkdir -p /opt/pocketbase
cd /opt/pocketbase

# Download PocketBase (latest version for Linux AMD64)
sudo wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.4/pocketbase_0.23.4_linux_amd64.zip

# Extract
sudo unzip pocketbase_0.23.4_linux_amd64.zip

# Make executable
sudo chmod +x pocketbase

# Test it works
sudo ./pocketbase --help
```

- [ ] Run commands above
- [ ] Should see PocketBase help output

#### 7.7 Transfer Your Database (Important!)

You have two options:

**Option A: Start Fresh (Easier)**
- [ ] Skip this step
- [ ] You'll recreate collections and users on the server

**Option B: Copy Local Database (Preserves Data)**
```bash
# On YOUR LOCAL computer (not server):
# Find your pb_data folder (where you ran ./pocketbase serve)
cd path/to/your/local/pocketbase
ls pb_data/  # Should see data.db, logs.db, etc.

# Copy to server (replace YOUR_EXTERNAL_IP)
scp -r pb_data YOUR_USERNAME@YOUR_EXTERNAL_IP:/opt/pocketbase/

# If using Google Cloud SSH in browser:
# 1. In browser SSH window, click gear icon → "Upload file"
# 2. Select your pb_data folder
# 3. Move to correct location:
sudo mv ~/pb_data /opt/pocketbase/
```

- [ ] Choose an option above
- [ ] If Option B: verify pb_data folder exists on server

#### 7.8 Create Systemd Service
#### 7.8 Create Systemd Service
```bash
# On server
sudo nano /etc/systemd/system/pocketbase.service
```

Paste this (press Ctrl+Shift+V in browser SSH):
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
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Save and exit: `Ctrl+X`, then `Y`, then `Enter`

```bash
# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable pocketbase
sudo systemctl start pocketbase

# Check status
sudo systemctl status pocketbase
```

- [ ] Create service file
- [ ] Paste configuration
- [ ] Save file
- [ ] Enable and start service
- [ ] Verify status shows "active (running)"
- [ ] Visit `http://YOUR_EXTERNAL_IP:8090/_/`
- [ ] Should see PocketBase admin UI

**Troubleshooting:**
```bash
# If service fails, check logs
sudo journalctl -u pocketbase -n 50

# Common issues:
# - Port already in use: sudo lsof -i :8090
# - Permission denied: sudo chown -R root:root /opt/pocketbase
# - File not found: verify pocketbase exists: ls -la /opt/pocketbase/pocketbase
```

---

### Option B: Paid VPS (Alternative - Skip if using Google Cloud)

#### 7.1B Get Hetzner VPS
- [ ] Go to [https://www.hetzner.com](https://www.hetzner.com)
- [ ] Sign up for account
- [ ] Cloud → Servers → "Add Server"
- [ ] Location: Choose closest to you
- [ ] Image: Ubuntu 22.04
- [ ] Type: Shared vCPU → CPX11 (2 vCPU, 2GB RAM, €4.15/mo)
- [ ] SSH key: Add your public key
- [ ] Create server
- [ ] Note the IP address

Then follow steps 7.5-7.8 above (same process).

---

## Phase 8: Domain Configuration (20 minutes)

### 8.1 Configure Google Cloud Firewall (If using Google Cloud)

By default, Google Cloud blocks most ports. We need to allow PocketBase traffic:

```bash
# On server, check if firewall is blocking port 8090
sudo ufw status
# If active, add rules:
sudo ufw allow 8090/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

**Or configure in Google Cloud Console:**
- [ ] Go to Console → VPC Network → Firewall
- [ ] Click "Create Firewall Rule"
- [ ] Name: `allow-pocketbase`
- [ ] Direction: Ingress
- [ ] Targets: All instances in the network
- [ ] Source IP ranges: `0.0.0.0/0`
- [ ] Protocols and ports: Specified → tcp: `8090`
- [ ] Click "Create"

- [ ] Create firewall rule
- [ ] Verify `http://YOUR_IP:8090/_/` loads

### 8.2 Configure Namecheap DNS
### 8.2 Configure Namecheap DNS
- [ ] Log in to Namecheap
- [ ] Go to Domain List → Manage
- [ ] Advanced DNS

**Add A Records:**
- [ ] Type: A Record, Host: `@`, Value: `YOUR_SERVER_IP`, TTL: Automatic
- [ ] Type: A Record, Host: `api`, Value: `YOUR_SERVER_IP`, TTL: Automatic
- [ ] Type: A Record, Host: `www`, Value: `YOUR_SERVER_IP`, TTL: Automatic

Example:
```
Type    Host    Value               TTL
A       @       34.123.45.67        Automatic
A       api     34.123.45.67        Automatic
A       www     34.123.45.67        Automatic
```

- [ ] Save changes
- [ ] Wait 5-15 minutes for DNS propagation

**Test DNS:**
```bash
# On your local computer
nslookup your-domain.com
nslookup api.your-domain.com

# Should return your server IP
```

### 8.3 Configure Nginx
### 8.3 Configure Nginx
```bash
# On server
sudo nano /etc/nginx/sites-available/sliceoflife
```

Paste this (replace `your-domain.com` with YOUR actual domain):
```nginx
# Frontend
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# PocketBase API
server {
    listen 80;
    server_name api.your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support (for PocketBase realtime)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Save: `Ctrl+X`, `Y`, `Enter`

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/sliceoflife /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

- [ ] Create nginx config
- [ ] Replace `your-domain.com` with your actual domain
- [ ] Enable site
- [ ] Test configuration (should say "test is successful")
- [ ] Reload nginx
- [ ] Visit `http://your-domain.com` - should see nginx welcome
- [ ] Visit `http://api.your-domain.com` - should see PocketBase

### 8.4 Upload Frontend Files

**Option A: Using SCP (from your computer)**
```bash
# On your local machine
cd slice-of-life
scp -r public/* YOUR_USERNAME@YOUR_SERVER_IP:/tmp/

# Then on server
ssh YOUR_USERNAME@YOUR_SERVER_IP
sudo mv /tmp/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
```

**Option B: Using Google Cloud SSH Upload**
- [ ] In browser SSH window, click gear icon → "Upload file"
- [ ] Select all files from your `public/` folder
- [ ] Upload them (may need to do multiple times)
- [ ] Then move to web root:

```bash
# On server
sudo rm -rf /var/www/html/*
sudo mv ~/* /var/www/html/
sudo mv ~/app /var/www/html/
sudo mv ~/scripts /var/www/html/
sudo mv ~/styles /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
```

**Option C: Using Git (Recommended)**
```bash
# On server
sudo apt install git -y
cd /tmp
git clone https://github.com/yourusername/slice-of-life.git
sudo rm -rf /var/www/html/*
sudo cp -r /tmp/slice-of-life/public/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html/
```

- [ ] Choose upload method
- [ ] Upload all files
- [ ] Verify files: `ls -la /var/www/html/`
- [ ] Should see: index.html, login.html, app/, scripts/, styles/

### 8.5 Install SSL Certificates
### 8.5 Install SSL Certificates
```bash
# On server
sudo certbot --nginx -d your-domain.com -d www.your-domain.com -d api.your-domain.com

# Follow prompts:
# 1. Enter email: your-email@example.com
# 2. Agree to terms: Y
# 3. Share email (optional): Y or N
# 4. Redirect HTTP to HTTPS: 2 (recommended)
```

- [ ] Run certbot command
- [ ] Provide email address
- [ ] Agree to terms of service
- [ ] Choose redirect option (2)
- [ ] Wait for certificates to be installed
- [ ] Should see "Congratulations!" message

**Verify SSL:**
- [ ] Visit `https://your-domain.com` (note HTTPS)
- [ ] Visit `https://api.your-domain.com`
- [ ] Visit `http://your-domain.com` (should redirect to HTTPS)
- [ ] Check for padlock icon in browser

**Troubleshooting:**
```bash
# If certbot fails with "connection refused"
# Wait longer for DNS to propagate (can take up to 48 hours)
# Check DNS: nslookup your-domain.com

# If "too many failed authorizations"
# Wait 1 hour and try again (Let's Encrypt rate limit)

# Check nginx is running
sudo systemctl status nginx

# Check firewall allows 80 and 443
sudo ufw status
```

**Auto-renewal:**
Certbot automatically sets up renewal. Test it:
```bash
sudo certbot renew --dry-run
```

- [ ] Test auto-renewal
- [ ] Should see "simulated renewal succeeded"

---

## Phase 9: Production Configuration (15 minutes)

### 9.1 Update Frontend for Production
```bash
# On local machine, edit public/scripts/pb.js
```

Change:
```javascript
const isDev = window.location.hostname === 'localhost';
export const pb = new PocketBase(
  isDev 
    ? 'http://127.0.0.1:8090' 
    : 'https://api.your-domain.com' // ← Update this
);
```

- [ ] Update production URL
- [ ] Re-upload: `scp public/scripts/pb.js root@YOUR_SERVER_IP:/var/www/html/scripts/`

### 9.2 Update OAuth Redirect URLs
**Google Cloud Console:**
- [ ] Add `https://api.your-domain.com/api/oauth2-redirect`

**PocketBase:**
- [ ] Visit `https://api.your-domain.com/_/`
- [ ] Settings → Auth providers → Google
- [ ] Verify redirect URL

### 9.3 Configure PocketBase Settings
- [ ] Visit `https://api.your-domain.com/_/`
- [ ] Settings → Application
- [ ] Set App name: "Slice of Life"
- [ ] Set App URL: `https://your-domain.com`
- [ ] Click Save

---

## Phase 10: Final Testing (30 minutes)

### 10.1 Test Production Site
- [ ] Visit `https://your-domain.com` (HTTPS, not HTTP)
- [ ] Landing page loads correctly
- [ ] No console errors (F12 → Console tab)
- [ ] Styles load correctly (not broken CSS)
- [ ] Dark mode works (change OS theme)
- [ ] Click "Try the App"
- [ ] Login page loads
- [ ] Login with email/password
- [ ] OR login with Google OAuth (if configured)
- [ ] Redirects to dashboard
- [ ] Dashboard shows your name/email
- [ ] Click "New Entry"
- [ ] Create test entry with today's date
- [ ] Entry saves successfully
- [ ] Click "All Entries"
- [ ] Your entry appears in list
- [ ] Click "Sign Out"
- [ ] Redirects to home page
- [ ] Verify you're logged out (try accessing /app/dashboard.html)

### 10.2 Test Security
- [ ] Open PocketBase admin: `https://api.your-domain.com/_/`
- [ ] Login with admin credentials
- [ ] Go to Collections → entries
- [ ] Verify entries exist
- [ ] Click "API Preview" tab
- [ ] Try "List/Search" without auth → should fail (401/403)
- [ ] Verify API rules are enforced

**Test cross-user security:**
- [ ] Create second test user
- [ ] Login as User B
- [ ] Create entry as User B
- [ ] Verify can't see User A's entries
- [ ] Try to access User A's entry URL directly → should fail

### 10.3 Test Different Devices
- [ ] Open on phone (Safari/Chrome)
- [ ] Test login works
- [ ] Test create entry works
- [ ] Check responsive design
- [ ] Open on tablet
- [ ] Test all features
- [ ] Open on desktop (different browser)
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari

### 10.4 Performance Check
- [ ] Visit `https://your-domain.com`
- [ ] Open DevTools (F12) → Network tab
- [ ] Reload page
- [ ] Check load time (should be < 2 seconds)
- [ ] Check total page size (should be < 500KB)
- [ ] Run Lighthouse audit:
  - F12 → Lighthouse tab
  - Click "Analyze page load"
  - Performance should be > 80
  - Accessibility should be > 90

### 10.5 Google Cloud Monitoring (If using Google Cloud)

**Set up basic monitoring:**
- [ ] Go to Google Cloud Console
- [ ] Click hamburger menu → "Monitoring"
- [ ] Click "Create Dashboard"
- [ ] Add chart: CPU utilization
- [ ] Add chart: Memory utilization
- [ ] Add chart: Disk usage
- [ ] Save dashboard

**Set up alerts (optional):**
- [ ] Monitoring → Alerting → Create Policy
- [ ] Condition: CPU utilization > 80%
- [ ] Notification: Email
- [ ] Save

This helps you know if your server is struggling.

---

## Completion Checklist

### MVP Complete
- [ ] PocketBase running on VPS
- [ ] Frontend deployed
- [ ] SSL certificates installed
- [ ] Domain pointing correctly
- [ ] Login works
- [ ] CRUD operations work
- [ ] Security rules enforced
- [ ] Mobile responsive

### Optional Enhancements
- [ ] Add markdown rendering (marked.js)
- [ ] Add search functionality
- [ ] Add edit/delete buttons
- [ ] Add entry statistics
- [ ] Add export functionality
- [ ] Add profile page
- [ ] Add password reset

---

## Estimated Timeline

- **Phase 1** (PocketBase Local): 20 min
- **Phase 2** (Structure): 10 min
- **Phase 3** (Landing): 1 hour
- **Phase 4** (Auth): 45 min
- **Phase 5** (App Pages): 2 hours
- **Phase 6** (Local Test): 30 min
- **Phase 7** (Server Setup): 45 min
  - Google Cloud setup: +15 min (first time only)
- **Phase 8** (Domain): 20 min
- **Phase 9** (Production): 15 min
- **Phase 10** (Testing): 30 min

**Total: ~6.5 hours** for complete deployment

**Google Cloud Free Tier Notes:**
- First setup takes extra 15 minutes
- But you get 1GB RAM, 30GB storage FREE forever
- Perfect for personal projects and learning
- Can handle 100+ users easily

---

## Troubleshooting

### Google Cloud Specific Issues

#### "Permission denied" when SSHing
```bash
# Make sure SSH keys are added in VM settings
# Or use browser SSH (click SSH button in console)
```

#### Firewall blocking ports
```bash
# Check firewall rules in Console
# Or disable ufw: sudo ufw disable
```

#### Low memory (< 1GB)
```bash
# Check memory usage
free -h

# If using 90%+, consider upgrading
# Or optimize nginx/pocketbase config
```

#### Free tier limits exceeded
```
# Monitor usage in Console → Billing
# e2-micro is free, but:
# - Must be in us-central1, us-west1, or us-east1
# - Only 1 instance per region
# - 30GB disk max
```

### General Issues

### PocketBase won't start
```bash
# Check if port 8090 is in use
netstat -tulpn | grep 8090

# Check service status
systemctl status pocketbase

# Check logs
journalctl -u pocketbase -f
```

### Can't login
- Check browser console for errors
- Verify PocketBase URL in `pb.js`
- Check CORS settings in PocketBase
- Verify users collection is set up correctly

### Entries not saving
- Check collection API rules
- Verify user is authenticated
- Check browser console
- Verify field names match

### SSL not working
```bash
# Check certbot
certbot certificates

# Renew if needed
certbot renew
```

---

**You're done! 🎉 Your app is live.**