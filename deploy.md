# Deploy PMC NestJS to a Live Server

This guide explains how to deploy the **Positive Mantra Consulting** NestJS website to production.

The app is a Node.js (NestJS) site that renders Handlebars views and serves files from `public/`. On Laragon, Apache uses `index.php` + `.htaccess` as a reverse proxy to Node on port `3000`. Live deployment follows the same idea: **Node runs the app**, and the web server (Apache/Nginx) forwards public traffic to it.

---

## 1. Server requirements

| Requirement | Notes |
|-------------|--------|
| **Node.js** | v20 LTS or newer (v22 also fine) |
| **npm** | Comes with Node |
| **Process manager** | **PM2** recommended (keeps Nest running after SSH disconnect) |
| **Web server** | Apache **or** Nginx (reverse proxy / SSL) |
| **PHP + cURL** | Only needed if you use the included `index.php` proxy (Apache shared-hosting style) |
| **SSL** | Let’s Encrypt or your host’s SSL panel |

> **Important:** Shared hosting that only allows PHP/static files (no persistent Node process) **cannot** run this NestJS app. You need a VPS, cloud VM, or Node-capable host (e.g. DigitalOcean, AWS Lightsail, Contabo, RunCloud, Plesk with Node, etc.).

---

## 2. What to upload

Upload the project (via Git, SFTP, or CI), then install and build **on the server**.

### Required on the server

```
pmc-nest/
├── dist/                 # created by `npm run build`
├── public/               # CSS, JS, images, favicon
├── views/                # Handlebars layouts, pages, partials
├── package.json
├── package-lock.json
├── .env                  # create on server (never commit secrets)
├── .htaccess             # Apache + PHP proxy (optional)
├── index.php             # Apache + PHP proxy (optional)
└── node_modules/         # created by `npm ci --omit=dev`
```

### Do **not** rely on uploading these for production runtime

- `src/` — only needed if you build on the server (recommended)
- `HTML/` — source HTML mockups; not required for Nest
- `node_modules/` from Windows — reinstall on Linux with `npm ci`
- `.env` from local — create a new production `.env` on the server

---

## 3. Production environment (`.env`)

Create `.env` in the project root on the live server:

```env
PORT=3000
HOST=127.0.0.1
APP_URL=https://your-domain.com
```

| Variable | Meaning |
|----------|---------|
| `PORT` | Port Nest listens on (must match your reverse proxy) |
| `HOST` | Use `127.0.0.1` so Node is only reachable locally (proxy in front) |
| `APP_URL` | Public HTTPS URL of the site |

If the site lives in a subdirectory (example: `https://ultramindlabs.com/pmc`), set:

```env
APP_URL=https://ultramindlabs.com/pmc
```

> Subdirectory hosting also needs Nest/base-path and proxy path configuration. Prefer a **subdomain** (e.g. `https://www.positivemantra.com`) when possible.

---

## 4. Deploy steps (recommended: VPS + PM2 + Nginx)

### Step A — Connect and prepare

```bash
ssh user@your-server-ip
sudo apt update
# Install Node 20 (example using NodeSource or nvm — use your preferred method)
node -v
npm -v
sudo npm install -g pm2
```

### Step B — Get the code

**Option 1 — Git (preferred)**

```bash
cd /var/www
git clone <your-repo-url> pmc-nest
cd pmc-nest
```

**Option 2 — SFTP**

Upload the project folder to e.g. `/var/www/pmc-nest`, then SSH in:

```bash
cd /var/www/pmc-nest
```

### Step C — Install, build, configure

```bash
cd /var/www/pmc-nest

# Production dependencies only
npm ci --omit=dev

# You still need Nest CLI / TypeScript to build.
# Easiest: install all deps, build, then prune:
npm ci
npm run build
npm prune --omit=dev

# Create production env
cp .env.example .env
nano .env   # set PORT, HOST, APP_URL
```

Confirm the build output exists:

```bash
ls dist/main.js
ls views/layouts/main.hbs
ls public/css
```

### Step D — Start with PM2

```bash
cd /var/www/pmc-nest
pm2 start dist/main.js --name pmc-nest
pm2 save
pm2 startup
# Run the command PM2 prints so it starts on reboot
```

Useful PM2 commands:

```bash
pm2 status
pm2 logs pmc-nest
pm2 restart pmc-nest
pm2 stop pmc-nest
```

Test Node directly on the server:

```bash
curl -I http://127.0.0.1:3000/
```

You should get `HTTP/1.1 200`.

### Step E — Nginx reverse proxy (recommended)

Create `/etc/nginx/sites-available/pmc-nest`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # After SSL is set up, redirect HTTP → HTTPS (certbot can add this)

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Optional: let Nginx serve static files faster
    location /css/ {
        alias /var/www/pmc-nest/public/css/;
        access_log off;
        expires 7d;
    }
    location /js/ {
        alias /var/www/pmc-nest/public/js/;
        access_log off;
        expires 7d;
    }
    location /images/ {
        alias /var/www/pmc-nest/public/images/;
        access_log off;
        expires 7d;
    }
    location /fonts/ {
        alias /var/www/pmc-nest/public/fonts/;
        access_log off;
        expires 30d;
    }
    location /videos/ {
        alias /var/www/pmc-nest/public/videos/;
        access_log off;
        expires 7d;
    }
    location = /favicon.ico {
        alias /var/www/pmc-nest/public/favicon.ico;
        access_log off;
        expires 30d;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/pmc-nest /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

SSL with Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Point the domain’s **A record** to the server IP before running Certbot.

---

## 5. Alternate: Apache + PHP proxy (Laragon-style)

Use this if the host already runs **Apache**, has **PHP with cURL**, and you can keep Nest running with PM2.

1. Document root = project root (where `index.php` and `.htaccess` live).
2. Nest must be running on `127.0.0.1:3000` (or the `PORT` in `.env`).
3. Ensure Apache allows `.htaccess` (`AllowOverride All`).
4. PHP `curl` extension must be enabled.

Files already in the repo:

- `.htaccess` — blocks directory listing, serves `/public` assets, routes other requests to `index.php`
- `index.php` — proxies to Nest using `PORT` / `HOST` from `.env`

Start Nest:

```bash
pm2 start dist/main.js --name pmc-nest
pm2 save
pm2 startup
```

Then open `https://your-domain.com`.

If Nest is down, `index.php` shows a clear error page instead of an Apache “Index of” listing.

> Pure Apache `mod_proxy` (without PHP) is cleaner if your host allows enabling `proxy` + `proxy_http` modules. The PHP proxy is the fallback when those modules are disabled (as on many Laragon defaults).

---

## 6. Update / redeploy process

Whenever you push new code:

```bash
cd /var/www/pmc-nest
git pull
npm ci
npm run build
npm prune --omit=dev
pm2 restart pmc-nest
```

If you only changed views or public assets (no TypeScript changes):

```bash
# views/ and public/ are read from disk — restart still recommended
pm2 restart pmc-nest
```

---

## 7. Production checklist

- [ ] Node.js installed on the server
- [ ] Code uploaded / cloned
- [ ] `.env` created with live `APP_URL`, `PORT`, `HOST=127.0.0.1`
- [ ] `npm run build` succeeded (`dist/main.js` exists)
- [ ] `views/` and `public/` present next to `dist/`
- [ ] PM2 running `pmc-nest` and set to start on reboot
- [ ] `curl http://127.0.0.1:3000/` returns 200
- [ ] Nginx/Apache reverse proxy (or `index.php`) configured
- [ ] Domain DNS points to the server
- [ ] HTTPS (SSL) enabled
- [ ] Homepage and key routes work: `/`, `/about`, `/consulting`, `/capacity-building`, `/technology`, `/career`, `/contact`
- [ ] CSS/JS/images load (no mixed-content HTTP assets on HTTPS)

---

## 8. Common problems

| Problem | Fix |
|---------|-----|
| Apache shows **Index of /** | Nest not running, or DocumentRoot wrong / `.htaccess` missing. Start PM2; confirm `index.php` is DocumentRoot. |
| **502 / NestJS not reachable** | `pm2 status` — app stopped or wrong `PORT`/`HOST` in `.env`. |
| Page loads but **no CSS** | `public/` missing, or wrong paths. Check `https://your-domain.com/css/style.css`. |
| **ENOENT … main.hbs** | `views/` folder missing on server, or layout path wrong. Ensure `views/layouts/main.hbs` exists. |
| Works on `:3000` but not on domain | Reverse proxy / vhost not configured; DNS not pointing to server. |
| Site dies after SSH logout | Use PM2 (not bare `node dist/main`). Run `pm2 startup` + `pm2 save`. |
| Port already in use | Change `PORT` in `.env` and update Nginx/`index.php` proxy target to match. |

---

## 9. Quick reference commands

```bash
# Build
npm ci && npm run build && npm prune --omit=dev

# Run (production)
pm2 start dist/main.js --name pmc-nest
# or after already created:
pm2 restart pmc-nest

# Logs
pm2 logs pmc-nest

# Health check (on server)
curl -I http://127.0.0.1:3000/
```

---

## 10. Security notes

- Keep `HOST=127.0.0.1` so Nest is not exposed on the public internet directly.
- Never commit `.env` (already in `.gitignore`).
- Do not expose `src/`, `node_modules/`, `.env`, or `.git` via the web root when using Apache DocumentRoot = project root (`.htaccess` already blocks common paths).
- Prefer Nginx reverse proxy with DocumentRoot **not** set to the whole repo when you can.

---

## Summary

1. Put code on a **Node-capable** server.  
2. Set production `.env`.  
3. `npm ci` → `npm run build`.  
4. Run with **PM2**: `pm2 start dist/main.js --name pmc-nest`.  
5. Put **Nginx or Apache** in front with SSL, proxying to `127.0.0.1:3000`.  
6. Redeploy with `git pull` → build → `pm2 restart pmc-nest`.
