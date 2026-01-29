# Slice of Life

A minimalist daily journaling app with a portfolio landing page.

**Live:** [carwbrown.com](https://carwbrown.com)

## Tech Stack

- **Frontend:** Vanilla HTML + CSS + JavaScript
- **Styling:** Pico CSS (landing) + custom CSS (app)
- **Backend:** PocketBase (SQLite with REST API)
- **Hosting:** Netlify (frontend) + GCP (backend)

## Local Development

### Prerequisites
- [PocketBase](https://pocketbase.io/docs/) (`brew install pocketbase` on Mac)

### Quick Start

```bash
# 1. Start PocketBase (Terminal 1)
pocketbase serve
# Admin UI: http://127.0.0.1:8090/_/

# 2. Serve frontend (Terminal 2)
python3 -m http.server 8000 --directory public

# 3. Open http://localhost:8000
```

### First Time PocketBase Setup

1. Open Admin UI at `http://127.0.0.1:8090/_/`
2. Create admin account
3. Create `entries` collection:
   - `user` (relation to users, required)
   - `date` (date, required)
   - `content` (plain text, required)
4. Set API rules for user-owned data
5. Enable Email/Password auth in users collection

## File Structure

```
slice-of-life/
├── public/
│   ├── index.html          # Landing page (portfolio)
│   ├── login.html          # Login page
│   ├── app/
│   │   ├── dashboard.html  # Main dashboard
│   │   ├── log.html        # Create entry
│   │   └── entries.html    # View all entries
│   ├── styles/
│   │   ├── landing.css
│   │   └── app.css
│   └── scripts/
│       ├── pb.js           # PocketBase client
│       └── auth.js         # Auth helpers
└── pb_data/                # PocketBase data (gitignored)
```

## Deployment

- **Frontend:** Netlify (auto-deploy from GitHub)
- **Backend:** See [docs/GCP_DEPLOYMENT.md](docs/GCP_DEPLOYMENT.md)
