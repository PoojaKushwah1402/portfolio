# Portfolio

Personal portfolio website.

## Setup

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Deploy

Cloudflare Pages (GitHub integration): every push to `main` builds and deploys.

- Static site: `next build` with `output: 'export'` → `out/`
- Contact form: Pages Function at `functions/api/contact.ts` (`POST /api/contact`) posts to Slack
- Required secrets (Pages → Settings → Variables and Secrets): `SLACK_BOT_TOKEN`, `SLACK_CHANNEL_ID`

`/api/contact` only exists on Cloudflare; it is not served by `next dev`.
