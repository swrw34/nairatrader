
## Changes

### 1. Wallet addresses (`src/lib/site.ts`)
- BTC → `bc1qv3dh9zn524ekhe0f4q2vcyx3evwgquxy6sztzz`
- USDT (TRC-20) → `TMdHG2FG58gG2ibzjxiyMDCLGirZGD4WBU`
- **Remove ETH** entirely (wallets, payment form radio, plans page row). DB enum keeps ETH for backward compatibility — no migration needed.

### 2. Logo — remove white background
- Run the existing `src/assets/naira-logo.png` through `imagegen--edit_image` with `transparent_background: true` to produce a transparent PNG.
- Re-upload via `lovable-assets` and overwrite `src/assets/naira-logo.png.asset.json`.
- Result: gold/black wordmark floats cleanly on the dark header and gold footer.

### 3. Rebrand to "NairaTrader Academy"
- `SITE.name` → `"NairaTrader Academy"`.
- Update all page `<title>` / OG metadata, hero copy, footer, About intro to reflect "NairaTrader Academy — a mentorship organised by NairaTrader."
- Header logo alt + footer copyright updated.

### 4. Hero "How it works" button visibility
- On `/` hero (dark background), the secondary button currently uses a default outline that blends in.
- Replace with an explicitly styled outline button: `border-gold/60 text-white hover:bg-gold hover:text-ink` so it's legible at rest, not just on hover.

### 5. Make Screenshot + Notes required (`PaymentProofForm.tsx` + `submissions.functions.ts`)
- Client schema: `notes` becomes `z.string().trim().min(5).max(1000)`; screenshot becomes required (validate `file` exists before submit, show inline error).
- Field labels drop "(optional)" and add a helper line ("Required — upload your transaction screenshot").
- Server `proofSchema`: `notes` required (min 5), `screenshot_path` required (min 1).

### 6. "How to pay with crypto" guide (Busha) on `/plans`
- New section above the checkout grid titled **"New to crypto? Pay in 4 steps with Busha"**.
- 4 numbered steps: (1) Create a free account on Busha, (2) Fund with Naira via bank transfer, (3) Buy USDT (TRC-20) for the plan amount, (4) Send to the wallet address below and submit proof.
- CTA link to `https://busha.io` (external, `target="_blank"`, `rel="noopener"`).
- Short note: "Busha is a Nigerian app — fastest Naira → USDT route."

## Out of scope
- No DB migration (enum unchanged).
- No automated payment verification.
- No new pages.

## Technical notes
- Files touched: `src/lib/site.ts`, `src/assets/naira-logo.png.asset.json`, `src/components/site/Logo.tsx` (alt text only), `src/components/site/Header.tsx`, `src/components/site/Footer.tsx`, `src/components/site/PaymentProofForm.tsx`, `src/lib/api/submissions.functions.ts`, `src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/plans.tsx`, `src/routes/contact.tsx`, `src/routes/how-it-works.tsx` (title/meta only where needed).
