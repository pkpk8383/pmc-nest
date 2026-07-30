# Laragon pmc-nest.test → NestJS Proxy

## Objective

Stop Apache "Index of" on `https://pmc-nest.test/` and route all traffic to the NestJS app on port 3000.

## Requirements

- Root `.htaccess` reverse-proxies requests to NestJS
- Disable directory listing (`Options -Indexes`)
- Configurable `PORT` via `.env` (Nest listens on same port Apache proxies to)
- Do not modify Laragon/Apache system configs outside the project

## Assumptions

- NestJS is running (`npm run start:dev`) on `127.0.0.1:3000`
- Laragon has `mod_rewrite`, `mod_proxy`, and `mod_proxy_http` enabled (default)
- DocumentRoot for `pmc-nest.test` is the project root

## Affected modules

- NestJS bootstrap (`src/main.ts`)
- Apache project root (`.htaccess`)
- Environment samples (`.env`, `.env.example`)

## Affected files

- `.htaccess` (new)
- `.env` (new, gitignored)
- `.env.example` (new)
- `src/main.ts` (PORT/HOST from env)
- `package.json` (optional: dotenv if needed)

## Database changes

None

## API changes

None

## Implementation phases

1. Add project-root `.htaccess` that proxies to `http://127.0.0.1:${PORT}` (default 3000)
2. Serve existing files under `public/` directly when requested as `/css`, `/js`, etc. OR proxy everything to Nest (Nest already serves `public/`)
3. Update `main.ts` to listen on `process.env.PORT` / `HOST`
4. Load `.env` via Node/`dotenv` or Nest Config — prefer lightweight `dotenv` only if required; otherwise document that Nest CLI / shell env supplies PORT, and create `.env` for documentation + use a tiny bootstrap load

## Testing requirements

- `http://127.0.0.1:3000/` returns 200
- `https://pmc-nest.test/` returns Nest HTML (not Index of)
- Static assets (e.g. `/css/...`) load
- Routes like `/about` work through proxy

## Security considerations

- Proxy only to localhost Nest process
- Do not expose `.env` via Apache (deny access to `.env` in `.htaccess`)
- Keep directory listing disabled

## Risks and dependencies

- `[P]` rewrite flag requires `mod_proxy` + `ProxyPass` permissions; if blocked, fallback is documenting Laragon vhost ProxyPass (outside workspace — ask user)
- Nest must be running or proxy returns 502

## Completion checklist

- [x] Plan saved
- [x] `.htaccess` added
- [x] Env PORT wired in Nest
- [x] `.env` / `.env.example` created
- [x] Verified via browser/request
