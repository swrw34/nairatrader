
## Overview
A 4-page marketing site for **NairaTrader** — forex mentorship ($5) and VIP ($10) — with crypto payment instructions and forms that capture leads + payment proofs into Lovable Cloud. No login/signup.

## Design
- Palette: **black, gold (#D4AF37-ish), white**, used professionally (not blingy). Dark hero, white content sections, gold accents on CTAs, dividers, icons, and key numbers.
- Typography: clean modern sans (e.g. Inter / Space Grotesk for headings).
- NairaTrader logo in nav + footer.
- Subtle motion: fade/slide on scroll, hover states on cards. No heavy effects.

## Pages & Routes
```
/             Home
/about        About NairaTrader + the 3 mentors
/how-it-works How the mentorship/VIP works
/plans        Mentorship $5 / VIP $10 + crypto checkout instructions
/contact      Contact form (general inquiries)
```
Each route gets its own SEO meta (title, description, og:title, og:description).

### Home
- Hero: headline, subhead, two CTAs ("View Plans", "How it works").
- Strip: 3 mentors (Sabiigal @midrizzy1, VixMayor @Vix_Mayor, DAX @thissdax) with X handles.
- "What you get" feature grid (signals, mentorship, community, risk management).
- Plans preview (links to /plans).
- Testimonial / trust strip.
- Final CTA → Plans.

### About
- Story of NairaTrader.
- Mission/values.
- Meet the 3 mentors (cards with X handles linked).

### How It Works
- 4 steps: Choose plan → Pay with crypto → Submit proof → Receive Telegram group link via email.
- Explanation of the partnership with the 3 traders who handle mentorship/VIP.
- FAQ.

### Plans / Pricing
- Two pricing cards:
  - **Mentorship — $5** (features list, "Get Mentorship" button).
  - **VIP — $10** (features list, highlighted "Most Popular", "Join VIP" button).
- Clicking a plan opens a checkout flow / scrolls to a "Pay with crypto" section showing:
  - Wallet addresses (BTC, USDT-TRC20, ETH) — placeholders the user fills in later (or via secrets/settings, see notes).
  - Copy-to-clipboard buttons.
  - Step-by-step pay instructions.
- **Payment Proof form** (the key form): name, email, plan selected (radio), crypto used, transaction hash, optional screenshot upload, notes. Submits to Cloud.
- After submit: success state telling the user they'll receive the Telegram group link by email shortly.

### Contact
- General contact form: name, email, subject, message. Submits to Cloud.
- Side panel with mentors' X handles.

## Backend (Lovable Cloud — required)
Enable Cloud, then:

### Tables
- `contact_submissions` (id, name, email, subject, message, created_at)
- `payment_proofs` (id, name, email, plan ['mentorship'|'vip'], amount_usd, crypto ['BTC'|'USDT'|'ETH'], tx_hash, screenshot_url, notes, status ['pending'|'approved'|'rejected'], created_at)
- Storage bucket `payment-proofs` (public-read off; signed URLs) for uploaded screenshots.
- Public inserts allowed via RLS (anonymous insert-only); selects restricted to service role only (no PII leakage).

### Server functions
- `submitContact` — validates with Zod, inserts row, optionally sends notification email.
- `submitPaymentProof` — validates with Zod, accepts screenshot via Storage upload (signed URL flow), inserts row, sends:
  - Admin notification email (to NairaTrader inbox).
  - User auto-acknowledgement email ("We received your proof, we'll verify and send the Telegram link shortly").

### Email
Use Lovable's built-in email (requires email domain setup — prompted in-flow). Two templates:
1. `payment-proof-received` (to user)
2. `payment-proof-admin` (to admin)
3. `contact-received` (to admin)

Sending the actual Telegram group link after manual verification stays a manual step done by the team (per the user's flow). We don't auto-grant access.

## Validation & Security
- Zod schemas on both client and server (name ≤100, email valid, message ≤1000, tx_hash 10–120 chars, file ≤5MB, image mime only).
- Honeypot field + basic rate-limit guard on submit functions.
- No secrets in client. Wallet addresses stored as `VITE_*` env values so they're easy to update without code changes.

## Tech notes (for the technically inclined)
- TanStack Start routes under `src/routes/`.
- shadcn components: Card, Button, Input, Textarea, RadioGroup, Dialog/Toast, Sonner.
- Tailwind v4 tokens in `src/styles.css`: define `--color-gold`, `--color-ink` etc. under `@theme`.
- Logo: use the uploaded NairaTrader image via Lovable Assets (no binary in repo).
- Forms use react-hook-form + zodResolver.

## Out of scope (confirm if you want any of these later)
- Automated crypto payment verification (no on-chain checking).
- User accounts / members area.
- Auto-delivering the Telegram invite link (kept manual by your team).
- Payment gateway integration (NOWPayments/Coinbase Commerce) — can add later if you want auto-confirmation.

## Open items I'll need from you during build
1. Your crypto wallet addresses (BTC, USDT-TRC20, ETH) — or I'll use placeholders you can swap.
2. Admin email address to receive notifications.
3. Your email sending domain (you'll be prompted to set it up in-flow).
4. Any short bio/credentials for the 3 mentors (otherwise I'll use their X handles only).
