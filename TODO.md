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
- [ ] Instagram handle for the contact section (currently placeholder)
- [ ] Slack quick-chat webhook for the message composer (needs a small API route + webhook URL)
- [ ] Google Search Console verification meta token (if DNS verification is annoying)
