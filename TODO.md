# Slice of Life - TODO

## Completed

### PocketBase Setup
- [x] Download and run PocketBase locally
- [x] Create admin account
- [x] Create `entries` collection with fields (user, date, content)
- [x] Set API rules for user-owned data
- [x] Enable Email/Password auth
- [x] Configure Google OAuth (optional)

### Project Structure
- [x] Create folder structure (public/, app/, styles/, scripts/)
- [x] Initialize git repo
- [x] Create .gitignore

### Landing Page
- [x] Create `public/index.html` with Pico CSS
- [x] Create `public/styles/landing.css`

### Authentication
- [x] Create `public/scripts/pb.js` (PocketBase client)
- [x] Create `public/scripts/auth.js` (auth helpers)
- [x] Create `public/login.html`
- [x] Email/password login
- [x] Google OAuth login

### App Pages
- [x] Create `public/styles/app.css`
- [x] Create `public/app/dashboard.html`
- [x] Create `public/app/log.html` (new entry)
- [x] Create `public/app/entries.html` (view all)
- [x] Sign out functionality

### Local Testing
- [x] Full auth flow works
- [x] CRUD operations work
- [x] Responsive design
- [x] Dark mode

### Documentation
- [x] Update README with local dev instructions
- [x] Create GCP deployment guide
- [x] Create CLAUDE.md with project guidelines

### Server Deployment
- [x] Create Google Cloud VM
- [x] Install PocketBase on server
- [x] Create systemd service
- [x] Update `public/scripts/pb.js` with production URL

## Remaining

### Domain Configuration
- [ ] Configure DNS (A records for domain and api subdomain)
- [ ] Set up nginx reverse proxy
- [ ] Install SSL certificates (certbot)

### Production Configuration
- [ ] Update OAuth redirect URLs
- [ ] Configure PocketBase settings

### Final Testing
- [ ] Test HTTPS access
- [ ] Test on mobile devices
- [ ] Test cross-browser
- [ ] Performance check (Lighthouse)

### Optional Enhancements
- [ ] Add markdown rendering (marked.js)
- [ ] Add search functionality
- [ ] Add edit/delete buttons for entries
- [ ] Add entry statistics (streak, total entries)
- [ ] Add export functionality (JSON/markdown)
- [ ] Add profile page
- [ ] Create web components for reusable UI:
  - [ ] icon-link.js
  - [ ] project-card.js
  - [ ] experience-item.js
  - [ ] entry-card.js
- [ ] Migrate landing page scripts to ES modules
- [ ] Split landing.css into modular files
