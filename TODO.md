# Launch TODO — poojakushwah.com

## SEO (do after deploying the new build)

- [ ] **1. Deploy** the new build (SSR content, sitemap, robots, OG image are all in this version).
- [ ] **2. Google Search Console** — https://search.google.com/search-console
  - Add property `poojakushwah.com` and verify (DNS TXT record is easiest).
  - Sitemaps → submit `https://poojakushwah.com/sitemap.xml`.
  - URL Inspection → paste `https://poojakushwah.com` → **Request indexing**.
- [ ] **3. Bing Webmaster Tools** — https://www.bing.com/webmasters
  - Add + verify the site (can import straight from Search Console).
  - Submit the same sitemap. (Bing powers ChatGPT / Copilot search answers.)
- [ ] **4. Backlinks — the real ranking lever.** Add `https://poojakushwah.com` to:
  - [ ] LinkedIn → Contact info website field + a Featured link
  - [ ] GitHub profile → website field
  - [ ] Instagram bio
  - [ ] Resume PDF (header link)
  - [ ] macrorides.in footer ("Built by" / team link)
- [ ] **5. Wait + re-check.** Indexing: a few days. Ranking for "Pooja Kushwah": 2–6 weeks.
  - Check progress with: `site:poojakushwah.com` on Google.

## Content (for Claude, whenever ready)

- [ ] Real photos for the "off the clock" wall (replace stock)
- [x] Instagram handle for the contact section (@pjk1402 — done)
- [ ] Google Search Console verification meta token (if DNS verification is annoying)

## Slack integration — quick-chat from the portfolio

Goal: visitor types in the "Quick message" composer → message pops into Pooja's Slack.

- [ ] Pooja: create a Slack **incoming webhook** (Slack → Apps → Incoming Webhooks → pick channel, e.g. `#personal` `C0B7AL04A3E`) and share the webhook URL with Claude
- [ ] Claude: add a tiny serverless endpoint that forwards `{message, email}` to the webhook (webhook URL stays server-side, never in the browser)
  - Note: the site is `output: 'export'` (static) — no Next API routes on this host. Options: a Vercel/Cloudflare serverless function on a small subdomain, or switch hosting to Vercel and drop `output: export`
- [ ] Claude: swap the composer's `mailto:` submit for a `fetch()` to that endpoint (keep mailto as fallback on error)
- [ ] Later (optional): phone number + WhatsApp quick-link alongside
