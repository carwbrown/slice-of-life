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

## Local Development

### Quick Start

**1. Install PocketBase via Homebrew (Mac)**
```bash
brew install pocketbase
```

**2. Start PocketBase (Terminal 1)**
```bash
cd slice-of-life
pocketbase serve
```
Visit `http://127.0.0.1:8090/_/` to access PocketBase admin UI.

**3. Start Local Web Server (Terminal 2)**
```bash
cd slice-of-life
python3 -m http.server 8000 --directory public
```

**4. Open the App**
Visit `http://localhost:8000` in your browser.

### First Time Setup

1. Create admin account in PocketBase at `http://127.0.0.1:8090/_/`
2. Create `entries` collection with fields:
   - `user` (relation to users, single, required)
   - `date` (date, required)
   - `content` (plain text, required)
3. Set API rules (see [TODO.md](./TODO.md) for details)
4. Enable Email/Password auth in users collection

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