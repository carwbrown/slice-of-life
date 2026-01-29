# Slice of Life

## Code Review Requirement
**All code changes must be shown to the user and approved before writing files.**

## Design Philosophy
- Follow plainvanillaweb.com principles
- Simplicity is paramount - no unnecessary complexity
- No build tools, no frameworks
- ES modules for JavaScript
- Vanilla CSS with custom properties
- PocketBase SDK for backend (loaded from CDN)

## Architecture
- Frontend: Vanilla HTML + CSS + JavaScript
- Backend: PocketBase (SQLite with REST API)
- Hosting: Frontend on Netlify (carwbrown.com), Backend on GCP

## File Structure
```
slice-of-life/
├── public/                      # Frontend (deployable files)
│   ├── index.html              # Landing page (portfolio)
│   ├── login.html              # Login page
│   ├── archive.html            # Archive page
│   │
│   ├── app/                    # Journal application
│   │   ├── dashboard.html      # Main dashboard
│   │   ├── entries.html        # View all entries
│   │   └── log.html            # Create new entry
│   │
│   ├── styles/
│   │   ├── landing.css         # Landing page customizations
│   │   └── app.css             # App styles (vanilla CSS)
│   │
│   └── scripts/
│       ├── pb.js               # PocketBase client setup
│       ├── auth.js             # Auth helpers
│       ├── theme.js            # Theme toggle
│       ├── landing.js          # Landing page logic
│       ├── experience-data.js  # Experience/work data
│       ├── experience-render.js # Experience rendering
│       ├── projects-data.js    # Projects data
│       └── projects-render.js  # Projects rendering
│
├── docs/                        # Documentation
├── pb_data/                     # PocketBase data (gitignored)
├── README.md
└── TODO.md
```

## Key Files
- `public/scripts/pb.js` - PocketBase client initialization (switches between local/prod URLs)
- `public/scripts/auth.js` - Authentication helpers (requireAuth, signOut, getCurrentUser)
- `public/index.html` - Portfolio landing page with Pico CSS
- `public/app/dashboard.html` - Main journal dashboard after login

## PocketBase Collections
- `users` - Built-in auth collection
- `entries` - Journal entries with fields: user (relation), date, content

## Development
```bash
# Terminal 1: Start PocketBase
pocketbase serve
# Admin UI at http://127.0.0.1:8090/_/

# Terminal 2: Serve frontend
python3 -m http.server 8000 --directory public
# App at http://localhost:8000
```

## GCP Deployment (PocketBase Backend)

### Prerequisites
- Google Cloud account with free tier
- gcloud CLI installed

### Option: Google Cloud Free Tier VM
1. Create e2-micro VM in us-central1/us-west1/us-east1 for free tier
2. SSH into VM and install PocketBase:
   ```bash
   sudo mkdir -p /opt/pocketbase
   cd /opt/pocketbase
   sudo wget https://github.com/pocketbase/pocketbase/releases/download/v0.23.4/pocketbase_0.23.4_linux_amd64.zip
   sudo unzip pocketbase_0.23.4_linux_amd64.zip
   sudo chmod +x pocketbase
   ```
3. Create systemd service `/etc/systemd/system/pocketbase.service`:
   ```ini
   [Unit]
   Description=PocketBase
   After=network.target

   [Service]
   Type=simple
   User=root
   WorkingDirectory=/opt/pocketbase
   ExecStart=/opt/pocketbase/pocketbase serve --http=0.0.0.0:8090
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
4. Enable and start: `sudo systemctl enable pocketbase && sudo systemctl start pocketbase`
5. Configure firewall to allow port 8090
6. Optional: nginx reverse proxy + SSL with certbot
7. Update `public/scripts/pb.js` with production URL

### Detailed steps in TODO.md Phase 7-9
